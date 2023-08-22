import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BasicATKFormService } from './basic-atk-form.service';
import { BasicATKService } from '../service/basic-atk.service';
import { IBasicATK } from '../basic-atk.model';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

import { BasicATKUpdateComponent } from './basic-atk-update.component';

describe('BasicATK Management Update Component', () => {
  let comp: BasicATKUpdateComponent;
  let fixture: ComponentFixture<BasicATKUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let basicATKFormService: BasicATKFormService;
  let basicATKService: BasicATKService;
  let damageService: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BasicATKUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BasicATKUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BasicATKUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    basicATKFormService = TestBed.inject(BasicATKFormService);
    basicATKService = TestBed.inject(BasicATKService);
    damageService = TestBed.inject(DamageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Damage query and add missing value', () => {
      const basicATK: IBasicATK = { id: 456 };
      const damage: IDamage = { id: 14475 };
      basicATK.damage = damage;

      const damageCollection: IDamage[] = [{ id: 33672 }];
      jest.spyOn(damageService, 'query').mockReturnValue(of(new HttpResponse({ body: damageCollection })));
      const additionalDamages = [damage];
      const expectedCollection: IDamage[] = [...additionalDamages, ...damageCollection];
      jest.spyOn(damageService, 'addDamageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ basicATK });
      comp.ngOnInit();

      expect(damageService.query).toHaveBeenCalled();
      expect(damageService.addDamageToCollectionIfMissing).toHaveBeenCalledWith(
        damageCollection,
        ...additionalDamages.map(expect.objectContaining)
      );
      expect(comp.damagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const basicATK: IBasicATK = { id: 456 };
      const damage: IDamage = { id: 51785 };
      basicATK.damage = damage;

      activatedRoute.data = of({ basicATK });
      comp.ngOnInit();

      expect(comp.damagesSharedCollection).toContain(damage);
      expect(comp.basicATK).toEqual(basicATK);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasicATK>>();
      const basicATK = { id: 123 };
      jest.spyOn(basicATKFormService, 'getBasicATK').mockReturnValue(basicATK);
      jest.spyOn(basicATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basicATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: basicATK }));
      saveSubject.complete();

      // THEN
      expect(basicATKFormService.getBasicATK).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(basicATKService.update).toHaveBeenCalledWith(expect.objectContaining(basicATK));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasicATK>>();
      const basicATK = { id: 123 };
      jest.spyOn(basicATKFormService, 'getBasicATK').mockReturnValue({ id: null });
      jest.spyOn(basicATKService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basicATK: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: basicATK }));
      saveSubject.complete();

      // THEN
      expect(basicATKFormService.getBasicATK).toHaveBeenCalled();
      expect(basicATKService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasicATK>>();
      const basicATK = { id: 123 };
      jest.spyOn(basicATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basicATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(basicATKService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDamage', () => {
      it('Should forward to damageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(damageService, 'compareDamage');
        comp.compareDamage(entity, entity2);
        expect(damageService.compareDamage).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

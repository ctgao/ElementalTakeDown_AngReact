import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UltimateATKFormService } from './ultimate-atk-form.service';
import { UltimateATKService } from '../service/ultimate-atk.service';
import { IUltimateATK } from '../ultimate-atk.model';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

import { UltimateATKUpdateComponent } from './ultimate-atk-update.component';

describe('UltimateATK Management Update Component', () => {
  let comp: UltimateATKUpdateComponent;
  let fixture: ComponentFixture<UltimateATKUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ultimateATKFormService: UltimateATKFormService;
  let ultimateATKService: UltimateATKService;
  let damageService: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UltimateATKUpdateComponent],
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
      .overrideTemplate(UltimateATKUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UltimateATKUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ultimateATKFormService = TestBed.inject(UltimateATKFormService);
    ultimateATKService = TestBed.inject(UltimateATKService);
    damageService = TestBed.inject(DamageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Damage query and add missing value', () => {
      const ultimateATK: IUltimateATK = { id: 456 };
      const damage: IDamage = { id: 60902 };
      ultimateATK.damage = damage;

      const damageCollection: IDamage[] = [{ id: 30171 }];
      jest.spyOn(damageService, 'query').mockReturnValue(of(new HttpResponse({ body: damageCollection })));
      const additionalDamages = [damage];
      const expectedCollection: IDamage[] = [...additionalDamages, ...damageCollection];
      jest.spyOn(damageService, 'addDamageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ultimateATK });
      comp.ngOnInit();

      expect(damageService.query).toHaveBeenCalled();
      expect(damageService.addDamageToCollectionIfMissing).toHaveBeenCalledWith(
        damageCollection,
        ...additionalDamages.map(expect.objectContaining)
      );
      expect(comp.damagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ultimateATK: IUltimateATK = { id: 456 };
      const damage: IDamage = { id: 56298 };
      ultimateATK.damage = damage;

      activatedRoute.data = of({ ultimateATK });
      comp.ngOnInit();

      expect(comp.damagesSharedCollection).toContain(damage);
      expect(comp.ultimateATK).toEqual(ultimateATK);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateATK>>();
      const ultimateATK = { id: 123 };
      jest.spyOn(ultimateATKFormService, 'getUltimateATK').mockReturnValue(ultimateATK);
      jest.spyOn(ultimateATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ultimateATK }));
      saveSubject.complete();

      // THEN
      expect(ultimateATKFormService.getUltimateATK).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ultimateATKService.update).toHaveBeenCalledWith(expect.objectContaining(ultimateATK));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateATK>>();
      const ultimateATK = { id: 123 };
      jest.spyOn(ultimateATKFormService, 'getUltimateATK').mockReturnValue({ id: null });
      jest.spyOn(ultimateATKService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateATK: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ultimateATK }));
      saveSubject.complete();

      // THEN
      expect(ultimateATKFormService.getUltimateATK).toHaveBeenCalled();
      expect(ultimateATKService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateATK>>();
      const ultimateATK = { id: 123 };
      jest.spyOn(ultimateATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ultimateATKService.update).toHaveBeenCalled();
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

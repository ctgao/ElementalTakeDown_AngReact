import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SkillATKFormService } from './skill-atk-form.service';
import { SkillATKService } from '../service/skill-atk.service';
import { ISkillATK } from '../skill-atk.model';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

import { SkillATKUpdateComponent } from './skill-atk-update.component';

describe('SkillATK Management Update Component', () => {
  let comp: SkillATKUpdateComponent;
  let fixture: ComponentFixture<SkillATKUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let skillATKFormService: SkillATKFormService;
  let skillATKService: SkillATKService;
  let damageService: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SkillATKUpdateComponent],
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
      .overrideTemplate(SkillATKUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SkillATKUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    skillATKFormService = TestBed.inject(SkillATKFormService);
    skillATKService = TestBed.inject(SkillATKService);
    damageService = TestBed.inject(DamageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Damage query and add missing value', () => {
      const skillATK: ISkillATK = { id: 456 };
      const damage: IDamage = { id: 13991 };
      skillATK.damage = damage;

      const damageCollection: IDamage[] = [{ id: 67811 }];
      jest.spyOn(damageService, 'query').mockReturnValue(of(new HttpResponse({ body: damageCollection })));
      const additionalDamages = [damage];
      const expectedCollection: IDamage[] = [...additionalDamages, ...damageCollection];
      jest.spyOn(damageService, 'addDamageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ skillATK });
      comp.ngOnInit();

      expect(damageService.query).toHaveBeenCalled();
      expect(damageService.addDamageToCollectionIfMissing).toHaveBeenCalledWith(
        damageCollection,
        ...additionalDamages.map(expect.objectContaining)
      );
      expect(comp.damagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const skillATK: ISkillATK = { id: 456 };
      const damage: IDamage = { id: 75683 };
      skillATK.damage = damage;

      activatedRoute.data = of({ skillATK });
      comp.ngOnInit();

      expect(comp.damagesSharedCollection).toContain(damage);
      expect(comp.skillATK).toEqual(skillATK);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillATK>>();
      const skillATK = { id: 123 };
      jest.spyOn(skillATKFormService, 'getSkillATK').mockReturnValue(skillATK);
      jest.spyOn(skillATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: skillATK }));
      saveSubject.complete();

      // THEN
      expect(skillATKFormService.getSkillATK).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(skillATKService.update).toHaveBeenCalledWith(expect.objectContaining(skillATK));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillATK>>();
      const skillATK = { id: 123 };
      jest.spyOn(skillATKFormService, 'getSkillATK').mockReturnValue({ id: null });
      jest.spyOn(skillATKService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillATK: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: skillATK }));
      saveSubject.complete();

      // THEN
      expect(skillATKFormService.getSkillATK).toHaveBeenCalled();
      expect(skillATKService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillATK>>();
      const skillATK = { id: 123 };
      jest.spyOn(skillATKService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillATK });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(skillATKService.update).toHaveBeenCalled();
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

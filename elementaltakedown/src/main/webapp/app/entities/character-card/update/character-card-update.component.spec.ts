import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CharacterCardFormService } from './character-card-form.service';
import { CharacterCardService } from '../service/character-card.service';
import { ICharacterCard } from '../character-card.model';
import { IBasicATK } from 'app/entities/basic-atk/basic-atk.model';
import { BasicATKService } from 'app/entities/basic-atk/service/basic-atk.service';
import { ISkillATK } from 'app/entities/skill-atk/skill-atk.model';
import { SkillATKService } from 'app/entities/skill-atk/service/skill-atk.service';
import { IUltimateATK } from 'app/entities/ultimate-atk/ultimate-atk.model';
import { UltimateATKService } from 'app/entities/ultimate-atk/service/ultimate-atk.service';

import { CharacterCardUpdateComponent } from './character-card-update.component';

describe('CharacterCard Management Update Component', () => {
  let comp: CharacterCardUpdateComponent;
  let fixture: ComponentFixture<CharacterCardUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let characterCardFormService: CharacterCardFormService;
  let characterCardService: CharacterCardService;
  let basicATKService: BasicATKService;
  let skillATKService: SkillATKService;
  let ultimateATKService: UltimateATKService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CharacterCardUpdateComponent],
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
      .overrideTemplate(CharacterCardUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CharacterCardUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    characterCardFormService = TestBed.inject(CharacterCardFormService);
    characterCardService = TestBed.inject(CharacterCardService);
    basicATKService = TestBed.inject(BasicATKService);
    skillATKService = TestBed.inject(SkillATKService);
    ultimateATKService = TestBed.inject(UltimateATKService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call BasicATK query and add missing value', () => {
      const characterCard: ICharacterCard = { id: 456 };
      const basic: IBasicATK = { id: 89426 };
      characterCard.basic = basic;

      const basicATKCollection: IBasicATK[] = [{ id: 30613 }];
      jest.spyOn(basicATKService, 'query').mockReturnValue(of(new HttpResponse({ body: basicATKCollection })));
      const additionalBasicATKS = [basic];
      const expectedCollection: IBasicATK[] = [...additionalBasicATKS, ...basicATKCollection];
      jest.spyOn(basicATKService, 'addBasicATKToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      expect(basicATKService.query).toHaveBeenCalled();
      expect(basicATKService.addBasicATKToCollectionIfMissing).toHaveBeenCalledWith(
        basicATKCollection,
        ...additionalBasicATKS.map(expect.objectContaining)
      );
      expect(comp.basicATKSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SkillATK query and add missing value', () => {
      const characterCard: ICharacterCard = { id: 456 };
      const skill: ISkillATK = { id: 12628 };
      characterCard.skill = skill;

      const skillATKCollection: ISkillATK[] = [{ id: 2499 }];
      jest.spyOn(skillATKService, 'query').mockReturnValue(of(new HttpResponse({ body: skillATKCollection })));
      const additionalSkillATKS = [skill];
      const expectedCollection: ISkillATK[] = [...additionalSkillATKS, ...skillATKCollection];
      jest.spyOn(skillATKService, 'addSkillATKToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      expect(skillATKService.query).toHaveBeenCalled();
      expect(skillATKService.addSkillATKToCollectionIfMissing).toHaveBeenCalledWith(
        skillATKCollection,
        ...additionalSkillATKS.map(expect.objectContaining)
      );
      expect(comp.skillATKSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UltimateATK query and add missing value', () => {
      const characterCard: ICharacterCard = { id: 456 };
      const ultimate: IUltimateATK = { id: 11773 };
      characterCard.ultimate = ultimate;

      const ultimateATKCollection: IUltimateATK[] = [{ id: 21352 }];
      jest.spyOn(ultimateATKService, 'query').mockReturnValue(of(new HttpResponse({ body: ultimateATKCollection })));
      const additionalUltimateATKS = [ultimate];
      const expectedCollection: IUltimateATK[] = [...additionalUltimateATKS, ...ultimateATKCollection];
      jest.spyOn(ultimateATKService, 'addUltimateATKToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      expect(ultimateATKService.query).toHaveBeenCalled();
      expect(ultimateATKService.addUltimateATKToCollectionIfMissing).toHaveBeenCalledWith(
        ultimateATKCollection,
        ...additionalUltimateATKS.map(expect.objectContaining)
      );
      expect(comp.ultimateATKSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const characterCard: ICharacterCard = { id: 456 };
      const basic: IBasicATK = { id: 26905 };
      characterCard.basic = basic;
      const skill: ISkillATK = { id: 5122 };
      characterCard.skill = skill;
      const ultimate: IUltimateATK = { id: 88049 };
      characterCard.ultimate = ultimate;

      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      expect(comp.basicATKSSharedCollection).toContain(basic);
      expect(comp.skillATKSSharedCollection).toContain(skill);
      expect(comp.ultimateATKSSharedCollection).toContain(ultimate);
      expect(comp.characterCard).toEqual(characterCard);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICharacterCard>>();
      const characterCard = { id: 123 };
      jest.spyOn(characterCardFormService, 'getCharacterCard').mockReturnValue(characterCard);
      jest.spyOn(characterCardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: characterCard }));
      saveSubject.complete();

      // THEN
      expect(characterCardFormService.getCharacterCard).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(characterCardService.update).toHaveBeenCalledWith(expect.objectContaining(characterCard));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICharacterCard>>();
      const characterCard = { id: 123 };
      jest.spyOn(characterCardFormService, 'getCharacterCard').mockReturnValue({ id: null });
      jest.spyOn(characterCardService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ characterCard: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: characterCard }));
      saveSubject.complete();

      // THEN
      expect(characterCardFormService.getCharacterCard).toHaveBeenCalled();
      expect(characterCardService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICharacterCard>>();
      const characterCard = { id: 123 };
      jest.spyOn(characterCardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ characterCard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(characterCardService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBasicATK', () => {
      it('Should forward to basicATKService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(basicATKService, 'compareBasicATK');
        comp.compareBasicATK(entity, entity2);
        expect(basicATKService.compareBasicATK).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSkillATK', () => {
      it('Should forward to skillATKService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(skillATKService, 'compareSkillATK');
        comp.compareSkillATK(entity, entity2);
        expect(skillATKService.compareSkillATK).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUltimateATK', () => {
      it('Should forward to ultimateATKService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ultimateATKService, 'compareUltimateATK');
        comp.compareUltimateATK(entity, entity2);
        expect(ultimateATKService.compareUltimateATK).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

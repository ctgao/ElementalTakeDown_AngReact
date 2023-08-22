import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DamageFormService } from './damage-form.service';
import { DamageService } from '../service/damage.service';
import { IDamage } from '../damage.model';

import { DamageUpdateComponent } from './damage-update.component';

describe('Damage Management Update Component', () => {
  let comp: DamageUpdateComponent;
  let fixture: ComponentFixture<DamageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let damageFormService: DamageFormService;
  let damageService: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DamageUpdateComponent],
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
      .overrideTemplate(DamageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DamageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    damageFormService = TestBed.inject(DamageFormService);
    damageService = TestBed.inject(DamageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const damage: IDamage = { id: 456 };

      activatedRoute.data = of({ damage });
      comp.ngOnInit();

      expect(comp.damage).toEqual(damage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDamage>>();
      const damage = { id: 123 };
      jest.spyOn(damageFormService, 'getDamage').mockReturnValue(damage);
      jest.spyOn(damageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ damage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: damage }));
      saveSubject.complete();

      // THEN
      expect(damageFormService.getDamage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(damageService.update).toHaveBeenCalledWith(expect.objectContaining(damage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDamage>>();
      const damage = { id: 123 };
      jest.spyOn(damageFormService, 'getDamage').mockReturnValue({ id: null });
      jest.spyOn(damageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ damage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: damage }));
      saveSubject.complete();

      // THEN
      expect(damageFormService.getDamage).toHaveBeenCalled();
      expect(damageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDamage>>();
      const damage = { id: 123 };
      jest.spyOn(damageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ damage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(damageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

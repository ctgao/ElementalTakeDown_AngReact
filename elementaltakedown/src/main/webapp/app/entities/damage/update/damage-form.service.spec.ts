import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../damage.test-samples';

import { DamageFormService } from './damage-form.service';

describe('Damage Form Service', () => {
  let service: DamageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageFormService);
  });

  describe('Service methods', () => {
    describe('createDamageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDamageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            dmgValue: expect.any(Object),
            dmgElement: expect.any(Object),
          })
        );
      });

      it('passing IDamage should create a new form with FormGroup', () => {
        const formGroup = service.createDamageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            dmgValue: expect.any(Object),
            dmgElement: expect.any(Object),
          })
        );
      });
    });

    describe('getDamage', () => {
      it('should return NewDamage for default Damage initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDamageFormGroup(sampleWithNewData);

        const damage = service.getDamage(formGroup) as any;

        expect(damage).toMatchObject(sampleWithNewData);
      });

      it('should return NewDamage for empty Damage initial value', () => {
        const formGroup = service.createDamageFormGroup();

        const damage = service.getDamage(formGroup) as any;

        expect(damage).toMatchObject({});
      });

      it('should return IDamage', () => {
        const formGroup = service.createDamageFormGroup(sampleWithRequiredData);

        const damage = service.getDamage(formGroup) as any;

        expect(damage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDamage should not enable id FormControl', () => {
        const formGroup = service.createDamageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDamage should disable id FormControl', () => {
        const formGroup = service.createDamageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ultimate-atk.test-samples';

import { UltimateATKFormService } from './ultimate-atk-form.service';

describe('UltimateATK Form Service', () => {
  let service: UltimateATKFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimateATKFormService);
  });

  describe('Service methods', () => {
    describe('createUltimateATKFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUltimateATKFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            requiredEnergy: expect.any(Object),
            damage: expect.any(Object),
          })
        );
      });

      it('passing IUltimateATK should create a new form with FormGroup', () => {
        const formGroup = service.createUltimateATKFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            requiredEnergy: expect.any(Object),
            damage: expect.any(Object),
          })
        );
      });
    });

    describe('getUltimateATK', () => {
      it('should return NewUltimateATK for default UltimateATK initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUltimateATKFormGroup(sampleWithNewData);

        const ultimateATK = service.getUltimateATK(formGroup) as any;

        expect(ultimateATK).toMatchObject(sampleWithNewData);
      });

      it('should return NewUltimateATK for empty UltimateATK initial value', () => {
        const formGroup = service.createUltimateATKFormGroup();

        const ultimateATK = service.getUltimateATK(formGroup) as any;

        expect(ultimateATK).toMatchObject({});
      });

      it('should return IUltimateATK', () => {
        const formGroup = service.createUltimateATKFormGroup(sampleWithRequiredData);

        const ultimateATK = service.getUltimateATK(formGroup) as any;

        expect(ultimateATK).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUltimateATK should not enable id FormControl', () => {
        const formGroup = service.createUltimateATKFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUltimateATK should disable id FormControl', () => {
        const formGroup = service.createUltimateATKFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

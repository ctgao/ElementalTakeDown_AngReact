import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../basic-atk.test-samples';

import { BasicATKFormService } from './basic-atk-form.service';

describe('BasicATK Form Service', () => {
  let service: BasicATKFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicATKFormService);
  });

  describe('Service methods', () => {
    describe('createBasicATKFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBasicATKFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            damage: expect.any(Object),
          })
        );
      });

      it('passing IBasicATK should create a new form with FormGroup', () => {
        const formGroup = service.createBasicATKFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            damage: expect.any(Object),
          })
        );
      });
    });

    describe('getBasicATK', () => {
      it('should return NewBasicATK for default BasicATK initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBasicATKFormGroup(sampleWithNewData);

        const basicATK = service.getBasicATK(formGroup) as any;

        expect(basicATK).toMatchObject(sampleWithNewData);
      });

      it('should return NewBasicATK for empty BasicATK initial value', () => {
        const formGroup = service.createBasicATKFormGroup();

        const basicATK = service.getBasicATK(formGroup) as any;

        expect(basicATK).toMatchObject({});
      });

      it('should return IBasicATK', () => {
        const formGroup = service.createBasicATKFormGroup(sampleWithRequiredData);

        const basicATK = service.getBasicATK(formGroup) as any;

        expect(basicATK).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBasicATK should not enable id FormControl', () => {
        const formGroup = service.createBasicATKFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBasicATK should disable id FormControl', () => {
        const formGroup = service.createBasicATKFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

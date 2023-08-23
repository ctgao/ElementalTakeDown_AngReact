import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../skill-atk.test-samples';

import { SkillATKFormService } from './skill-atk-form.service';

describe('SkillATK Form Service', () => {
  let service: SkillATKFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillATKFormService);
  });

  describe('Service methods', () => {
    describe('createSkillATKFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSkillATKFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            damage: expect.any(Object),
          })
        );
      });

      it('passing ISkillATK should create a new form with FormGroup', () => {
        const formGroup = service.createSkillATKFormGroup(sampleWithRequiredData);

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

    describe('getSkillATK', () => {
      it('should return NewSkillATK for default SkillATK initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSkillATKFormGroup(sampleWithNewData);

        const skillATK = service.getSkillATK(formGroup) as any;

        expect(skillATK).toMatchObject(sampleWithNewData);
      });

      it('should return NewSkillATK for empty SkillATK initial value', () => {
        const formGroup = service.createSkillATKFormGroup();

        const skillATK = service.getSkillATK(formGroup) as any;

        expect(skillATK).toMatchObject({});
      });

      it('should return ISkillATK', () => {
        const formGroup = service.createSkillATKFormGroup(sampleWithRequiredData);

        const skillATK = service.getSkillATK(formGroup) as any;

        expect(skillATK).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISkillATK should not enable id FormControl', () => {
        const formGroup = service.createSkillATKFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSkillATK should disable id FormControl', () => {
        const formGroup = service.createSkillATKFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

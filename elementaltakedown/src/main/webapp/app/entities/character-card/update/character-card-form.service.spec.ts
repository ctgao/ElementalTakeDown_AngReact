import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../character-card.test-samples';

import { CharacterCardFormService } from './character-card-form.service';

describe('CharacterCard Form Service', () => {
  let service: CharacterCardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterCardFormService);
  });

  describe('Service methods', () => {
    describe('createCharacterCardFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCharacterCardFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            element: expect.any(Object),
            basic: expect.any(Object),
            skill: expect.any(Object),
            ultimate: expect.any(Object),
            owners: expect.any(Object),
          })
        );
      });

      it('passing ICharacterCard should create a new form with FormGroup', () => {
        const formGroup = service.createCharacterCardFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            element: expect.any(Object),
            basic: expect.any(Object),
            skill: expect.any(Object),
            ultimate: expect.any(Object),
            owners: expect.any(Object),
          })
        );
      });
    });

    describe('getCharacterCard', () => {
      it('should return NewCharacterCard for default CharacterCard initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCharacterCardFormGroup(sampleWithNewData);

        const characterCard = service.getCharacterCard(formGroup) as any;

        expect(characterCard).toMatchObject(sampleWithNewData);
      });

      it('should return NewCharacterCard for empty CharacterCard initial value', () => {
        const formGroup = service.createCharacterCardFormGroup();

        const characterCard = service.getCharacterCard(formGroup) as any;

        expect(characterCard).toMatchObject({});
      });

      it('should return ICharacterCard', () => {
        const formGroup = service.createCharacterCardFormGroup(sampleWithRequiredData);

        const characterCard = service.getCharacterCard(formGroup) as any;

        expect(characterCard).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICharacterCard should not enable id FormControl', () => {
        const formGroup = service.createCharacterCardFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCharacterCard should disable id FormControl', () => {
        const formGroup = service.createCharacterCardFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

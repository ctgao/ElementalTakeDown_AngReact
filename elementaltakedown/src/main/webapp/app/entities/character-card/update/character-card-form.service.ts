import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICharacterCard, NewCharacterCard } from '../character-card.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICharacterCard for edit and NewCharacterCardFormGroupInput for create.
 */
type CharacterCardFormGroupInput = ICharacterCard | PartialWithRequiredKeyOf<NewCharacterCard>;

type CharacterCardFormDefaults = Pick<NewCharacterCard, 'id'>;

type CharacterCardFormGroupContent = {
  id: FormControl<ICharacterCard['id'] | NewCharacterCard['id']>;
  name: FormControl<ICharacterCard['name']>;
  element: FormControl<ICharacterCard['element']>;
  basic: FormControl<ICharacterCard['basic']>;
  skill: FormControl<ICharacterCard['skill']>;
  ultimate: FormControl<ICharacterCard['ultimate']>;
};

export type CharacterCardFormGroup = FormGroup<CharacterCardFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CharacterCardFormService {
  createCharacterCardFormGroup(characterCard: CharacterCardFormGroupInput = { id: null }): CharacterCardFormGroup {
    const characterCardRawValue = {
      ...this.getFormDefaults(),
      ...characterCard,
    };
    return new FormGroup<CharacterCardFormGroupContent>({
      id: new FormControl(
        { value: characterCardRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(characterCardRawValue.name, {
        validators: [Validators.required],
      }),
      element: new FormControl(characterCardRawValue.element, {
        validators: [Validators.required],
      }),
      basic: new FormControl(characterCardRawValue.basic, {
        validators: [Validators.required],
      }),
      skill: new FormControl(characterCardRawValue.skill, {
        validators: [Validators.required],
      }),
      ultimate: new FormControl(characterCardRawValue.ultimate, {
        validators: [Validators.required],
      }),
    });
  }

  getCharacterCard(form: CharacterCardFormGroup): ICharacterCard | NewCharacterCard {
    return form.getRawValue() as ICharacterCard | NewCharacterCard;
  }

  resetForm(form: CharacterCardFormGroup, characterCard: CharacterCardFormGroupInput): void {
    const characterCardRawValue = { ...this.getFormDefaults(), ...characterCard };
    form.reset(
      {
        ...characterCardRawValue,
        id: { value: characterCardRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CharacterCardFormDefaults {
    return {
      id: null,
    };
  }
}

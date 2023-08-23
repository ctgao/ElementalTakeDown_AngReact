import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBasicATK, NewBasicATK } from '../basic-atk.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBasicATK for edit and NewBasicATKFormGroupInput for create.
 */
type BasicATKFormGroupInput = IBasicATK | PartialWithRequiredKeyOf<NewBasicATK>;

type BasicATKFormDefaults = Pick<NewBasicATK, 'id'>;

type BasicATKFormGroupContent = {
  id: FormControl<IBasicATK['id'] | NewBasicATK['id']>;
  name: FormControl<IBasicATK['name']>;
  description: FormControl<IBasicATK['description']>;
  damage: FormControl<IBasicATK['damage']>;
};

export type BasicATKFormGroup = FormGroup<BasicATKFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BasicATKFormService {
  createBasicATKFormGroup(basicATK: BasicATKFormGroupInput = { id: null }): BasicATKFormGroup {
    const basicATKRawValue = {
      ...this.getFormDefaults(),
      ...basicATK,
    };
    return new FormGroup<BasicATKFormGroupContent>({
      id: new FormControl(
        { value: basicATKRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(basicATKRawValue.name),
      description: new FormControl(basicATKRawValue.description),
      damage: new FormControl(basicATKRawValue.damage, {
        validators: [Validators.required],
      }),
    });
  }

  getBasicATK(form: BasicATKFormGroup): IBasicATK | NewBasicATK {
    return form.getRawValue() as IBasicATK | NewBasicATK;
  }

  resetForm(form: BasicATKFormGroup, basicATK: BasicATKFormGroupInput): void {
    const basicATKRawValue = { ...this.getFormDefaults(), ...basicATK };
    form.reset(
      {
        ...basicATKRawValue,
        id: { value: basicATKRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BasicATKFormDefaults {
    return {
      id: null,
    };
  }
}

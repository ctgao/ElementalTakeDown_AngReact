import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUltimateATK, NewUltimateATK } from '../ultimate-atk.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUltimateATK for edit and NewUltimateATKFormGroupInput for create.
 */
type UltimateATKFormGroupInput = IUltimateATK | PartialWithRequiredKeyOf<NewUltimateATK>;

type UltimateATKFormDefaults = Pick<NewUltimateATK, 'id'>;

type UltimateATKFormGroupContent = {
  id: FormControl<IUltimateATK['id'] | NewUltimateATK['id']>;
  name: FormControl<IUltimateATK['name']>;
  description: FormControl<IUltimateATK['description']>;
  requiredEnergy: FormControl<IUltimateATK['requiredEnergy']>;
  damage: FormControl<IUltimateATK['damage']>;
};

export type UltimateATKFormGroup = FormGroup<UltimateATKFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UltimateATKFormService {
  createUltimateATKFormGroup(ultimateATK: UltimateATKFormGroupInput = { id: null }): UltimateATKFormGroup {
    const ultimateATKRawValue = {
      ...this.getFormDefaults(),
      ...ultimateATK,
    };
    return new FormGroup<UltimateATKFormGroupContent>({
      id: new FormControl(
        { value: ultimateATKRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(ultimateATKRawValue.name),
      description: new FormControl(ultimateATKRawValue.description),
      requiredEnergy: new FormControl(ultimateATKRawValue.requiredEnergy, {
        validators: [Validators.required],
      }),
      damage: new FormControl(ultimateATKRawValue.damage, {
        validators: [Validators.required],
      }),
    });
  }

  getUltimateATK(form: UltimateATKFormGroup): IUltimateATK | NewUltimateATK {
    return form.getRawValue() as IUltimateATK | NewUltimateATK;
  }

  resetForm(form: UltimateATKFormGroup, ultimateATK: UltimateATKFormGroupInput): void {
    const ultimateATKRawValue = { ...this.getFormDefaults(), ...ultimateATK };
    form.reset(
      {
        ...ultimateATKRawValue,
        id: { value: ultimateATKRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UltimateATKFormDefaults {
    return {
      id: null,
    };
  }
}

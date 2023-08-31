import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDamage, NewDamage } from '../damage.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDamage for edit and NewDamageFormGroupInput for create.
 */
type DamageFormGroupInput = IDamage | PartialWithRequiredKeyOf<NewDamage>;

type DamageFormDefaults = Pick<NewDamage, 'id'>;

type DamageFormGroupContent = {
  id: FormControl<IDamage['id'] | NewDamage['id']>;
  name: FormControl<IDamage['name']>;
  dmgValue: FormControl<IDamage['dmgValue']>;
  dmgElement: FormControl<IDamage['dmgElement']>;
  splashDmg: FormControl<IDamage['splashDmg']>;
  splashElement: FormControl<IDamage['splashElement']>;
};

export type DamageFormGroup = FormGroup<DamageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DamageFormService {
  createDamageFormGroup(damage: DamageFormGroupInput = { id: null }): DamageFormGroup {
    const damageRawValue = {
      ...this.getFormDefaults(),
      ...damage,
    };
    return new FormGroup<DamageFormGroupContent>({
      id: new FormControl(
        { value: damageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(damageRawValue.name),
      dmgValue: new FormControl(damageRawValue.dmgValue, {
        validators: [Validators.required],
      }),
      dmgElement: new FormControl(damageRawValue.dmgElement, {
        validators: [Validators.required],
      }),
      splashDmg: new FormControl(damageRawValue.splashDmg),
      splashElement: new FormControl(damageRawValue.splashElement),
    });
  }

  getDamage(form: DamageFormGroup): IDamage | NewDamage {
    return form.getRawValue() as IDamage | NewDamage;
  }

  resetForm(form: DamageFormGroup, damage: DamageFormGroupInput): void {
    const damageRawValue = { ...this.getFormDefaults(), ...damage };
    form.reset(
      {
        ...damageRawValue,
        id: { value: damageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DamageFormDefaults {
    return {
      id: null,
    };
  }
}

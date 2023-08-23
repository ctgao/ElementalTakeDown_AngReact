import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISkillATK, NewSkillATK } from '../skill-atk.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISkillATK for edit and NewSkillATKFormGroupInput for create.
 */
type SkillATKFormGroupInput = ISkillATK | PartialWithRequiredKeyOf<NewSkillATK>;

type SkillATKFormDefaults = Pick<NewSkillATK, 'id'>;

type SkillATKFormGroupContent = {
  id: FormControl<ISkillATK['id'] | NewSkillATK['id']>;
  name: FormControl<ISkillATK['name']>;
  description: FormControl<ISkillATK['description']>;
  damage: FormControl<ISkillATK['damage']>;
};

export type SkillATKFormGroup = FormGroup<SkillATKFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SkillATKFormService {
  createSkillATKFormGroup(skillATK: SkillATKFormGroupInput = { id: null }): SkillATKFormGroup {
    const skillATKRawValue = {
      ...this.getFormDefaults(),
      ...skillATK,
    };
    return new FormGroup<SkillATKFormGroupContent>({
      id: new FormControl(
        { value: skillATKRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(skillATKRawValue.name),
      description: new FormControl(skillATKRawValue.description),
      damage: new FormControl(skillATKRawValue.damage, {
        validators: [Validators.required],
      }),
    });
  }

  getSkillATK(form: SkillATKFormGroup): ISkillATK | NewSkillATK {
    return form.getRawValue() as ISkillATK | NewSkillATK;
  }

  resetForm(form: SkillATKFormGroup, skillATK: SkillATKFormGroupInput): void {
    const skillATKRawValue = { ...this.getFormDefaults(), ...skillATK };
    form.reset(
      {
        ...skillATKRawValue,
        id: { value: skillATKRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SkillATKFormDefaults {
    return {
      id: null,
    };
  }
}

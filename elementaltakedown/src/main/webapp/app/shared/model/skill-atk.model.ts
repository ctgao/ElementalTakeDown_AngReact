import { IDamage } from 'app/shared/model/damage.model';

export interface ISkillATK {
  id?: number;
  name?: string | null;
  description?: string | null;
  damage?: IDamage;
}

export const defaultValue: Readonly<ISkillATK> = {};

import { IDamage } from 'app/entities/damage/damage.model';

export interface ISkillATK {
  id: number;
  name?: string | null;
  description?: string | null;
  damage?: Pick<IDamage, 'id' | 'name'> | null;
}

export type NewSkillATK = Omit<ISkillATK, 'id'> & { id: null };

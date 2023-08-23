import { IDamage } from 'app/entities/damage/damage.model';

export interface IBasicATK {
  id: number;
  name?: string | null;
  description?: string | null;
  damage?: Pick<IDamage, 'id' | 'name'> | null;
}

export type NewBasicATK = Omit<IBasicATK, 'id'> & { id: null };

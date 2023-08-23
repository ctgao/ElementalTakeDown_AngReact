import { IDamage } from 'app/entities/damage/damage.model';

export interface IUltimateATK {
  id: number;
  name?: string | null;
  description?: string | null;
  requiredEnergy?: number | null;
  damage?: Pick<IDamage, 'id' | 'name'> | null;
}

export type NewUltimateATK = Omit<IUltimateATK, 'id'> & { id: null };

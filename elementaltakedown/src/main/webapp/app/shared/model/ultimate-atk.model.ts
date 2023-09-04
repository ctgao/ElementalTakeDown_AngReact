import { IDamage } from 'app/shared/model/damage.model';

export interface IUltimateATK {
  id?: number;
  name?: string | null;
  description?: string | null;
  requiredEnergy?: number;
  damage?: IDamage;
}

export const defaultValue: Readonly<IUltimateATK> = {};

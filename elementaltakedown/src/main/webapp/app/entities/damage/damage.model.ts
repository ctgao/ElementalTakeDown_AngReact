import { DmgElementType } from 'app/entities/enumerations/dmg-element-type.model';

export interface IDamage {
  id: number;
  name?: string | null;
  dmgValue?: number | null;
  dmgElement?: DmgElementType | null;
}

export type NewDamage = Omit<IDamage, 'id'> & { id: null };

import { DmgElementType } from 'app/shared/model/enumerations/dmg-element-type.model';

export interface IDamage {
  id?: number;
  name?: string | null;
  dmgValue?: number;
  dmgElement?: DmgElementType;
  splashDmg?: number | null;
  splashElement?: DmgElementType | null;
}

export const defaultValue: Readonly<IDamage> = {};

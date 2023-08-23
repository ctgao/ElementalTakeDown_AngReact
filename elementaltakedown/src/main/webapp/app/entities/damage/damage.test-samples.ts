import { DmgElementType } from 'app/entities/enumerations/dmg-element-type.model';

import { IDamage, NewDamage } from './damage.model';

export const sampleWithRequiredData: IDamage = {
  id: 44851,
  dmgValue: 68919,
  dmgElement: DmgElementType['PHYSICAL'],
};

export const sampleWithPartialData: IDamage = {
  id: 46013,
  name: 'Money Metal',
  dmgValue: 44653,
  dmgElement: DmgElementType['PHYSICAL'],
};

export const sampleWithFullData: IDamage = {
  id: 55461,
  name: 'payment Soft',
  dmgValue: 77020,
  dmgElement: DmgElementType['ELECTRIC'],
};

export const sampleWithNewData: NewDamage = {
  dmgValue: 7962,
  dmgElement: DmgElementType['WIND'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

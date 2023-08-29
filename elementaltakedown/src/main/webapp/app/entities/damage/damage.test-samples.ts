import { DmgElementType } from 'app/entities/enumerations/dmg-element-type.model';

import { IDamage, NewDamage } from './damage.model';

export const sampleWithRequiredData: IDamage = {
  id: 44851,
  dmgValue: 68919,
  dmgElement: DmgElementType['PHYSICAL'],
};

export const sampleWithPartialData: IDamage = {
  id: 61454,
  name: 'yellow Fresh',
  dmgValue: 66227,
  dmgElement: DmgElementType['ELECTRIC'],
  splashElement: DmgElementType['PHYSICAL'],
};

export const sampleWithFullData: IDamage = {
  id: 12440,
  name: 'Loan Refined SCSI',
  dmgValue: 12624,
  dmgElement: DmgElementType['FIRE'],
  splashDmg: 78360,
  splashElement: DmgElementType['WATER'],
};

export const sampleWithNewData: NewDamage = {
  dmgValue: 96080,
  dmgElement: DmgElementType['ELECTRIC'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

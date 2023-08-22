import { IUltimateATK, NewUltimateATK } from './ultimate-atk.model';

export const sampleWithRequiredData: IUltimateATK = {
  id: 99436,
  requiredEnergy: 39508,
};

export const sampleWithPartialData: IUltimateATK = {
  id: 18825,
  name: 'cultivate',
  description: 'Washington optical',
  requiredEnergy: 77183,
};

export const sampleWithFullData: IUltimateATK = {
  id: 34444,
  name: 'parsing quantifying',
  description: 'Checking Table',
  requiredEnergy: 15569,
};

export const sampleWithNewData: NewUltimateATK = {
  requiredEnergy: 59516,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

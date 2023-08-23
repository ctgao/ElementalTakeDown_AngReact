import { IBasicATK, NewBasicATK } from './basic-atk.model';

export const sampleWithRequiredData: IBasicATK = {
  id: 96266,
};

export const sampleWithPartialData: IBasicATK = {
  id: 76481,
  description: 'compressing green',
};

export const sampleWithFullData: IBasicATK = {
  id: 92552,
  name: 'Handmade auxiliary withdrawal',
  description: 'impactful Ergonomic Executive',
};

export const sampleWithNewData: NewBasicATK = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

import { IBasicATK, NewBasicATK } from './basic-atk.model';

export const sampleWithRequiredData: IBasicATK = {
  id: 96266,
};

export const sampleWithPartialData: IBasicATK = {
  id: 57430,
};

export const sampleWithFullData: IBasicATK = {
  id: 76481,
  name: 'compressing green',
};

export const sampleWithNewData: NewBasicATK = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

import { ISkillATK, NewSkillATK } from './skill-atk.model';

export const sampleWithRequiredData: ISkillATK = {
  id: 59253,
};

export const sampleWithPartialData: ISkillATK = {
  id: 12820,
  description: 'Texas HTTP models',
};

export const sampleWithFullData: ISkillATK = {
  id: 32928,
  name: 'Hampshire Missouri Italy',
  description: 'parse',
};

export const sampleWithNewData: NewSkillATK = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

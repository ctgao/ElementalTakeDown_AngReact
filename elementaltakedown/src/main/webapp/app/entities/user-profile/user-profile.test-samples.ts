import { IUserProfile, NewUserProfile } from './user-profile.model';

export const sampleWithRequiredData: IUserProfile = {
  id: 10373,
};

export const sampleWithPartialData: IUserProfile = {
  id: 60119,
  name: 'Engineer Baby Tajikistan',
};

export const sampleWithFullData: IUserProfile = {
  id: 93499,
  name: 'vortals',
};

export const sampleWithNewData: NewUserProfile = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

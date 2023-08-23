import { ElementType } from 'app/entities/enumerations/element-type.model';

import { ICharacterCard, NewCharacterCard } from './character-card.model';

export const sampleWithRequiredData: ICharacterCard = {
  id: 88270,
  name: 'global Baby connecting',
  element: ElementType['WATER'],
};

export const sampleWithPartialData: ICharacterCard = {
  id: 4393,
  name: 'Metal tan',
  element: ElementType['WATER'],
};

export const sampleWithFullData: ICharacterCard = {
  id: 2712,
  name: 'Isle Dakota',
  element: ElementType['FIRE'],
};

export const sampleWithNewData: NewCharacterCard = {
  name: 'copying Steel',
  element: ElementType['FIRE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

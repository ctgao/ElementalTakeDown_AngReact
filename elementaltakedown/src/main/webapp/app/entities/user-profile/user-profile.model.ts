import { ICharacterCard } from 'app/entities/character-card/character-card.model';

export interface IUserProfile {
  id: number;
  name?: string | null;
  cards?: Pick<ICharacterCard, 'id' | 'name'>[] | null;
}

export type NewUserProfile = Omit<IUserProfile, 'id'> & { id: null };

import { IUser } from 'app/entities/user/user.model';
import { ICharacterCard } from 'app/entities/character-card/character-card.model';

export interface IUserProfile {
  id: number;
  name?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  cards?: Pick<ICharacterCard, 'id' | 'name'>[] | null;
}

export type NewUserProfile = Omit<IUserProfile, 'id'> & { id: null };

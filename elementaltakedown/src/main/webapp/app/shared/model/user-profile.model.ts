import { IUser } from 'app/shared/model/user.model';
import { ICharacterCard } from 'app/shared/model/character-card.model';

export interface IUserProfile {
  id?: number;
  name?: string | null;
  user?: IUser | null;
  cards?: ICharacterCard[] | null;
}

export const defaultValue: Readonly<IUserProfile> = {};

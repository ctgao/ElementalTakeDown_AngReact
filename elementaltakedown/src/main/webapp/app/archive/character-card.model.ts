import { IBasicATK } from 'app/entities/basic-atk/basic-atk.model';
import { ISkillATK } from 'app/entities/skill-atk/skill-atk.model';
import { IUltimateATK } from 'app/entities/ultimate-atk/ultimate-atk.model';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';
import { ElementType } from 'app/entities/enumerations/element-type.model';

export interface ICharacterCard {
  id: number;
  name?: string | null;
  element?: ElementType | null;
  basic?: Pick<IBasicATK, 'id' | 'name'> | null;
  skill?: Pick<ISkillATK, 'id' | 'name'> | null;
  ultimate?: Pick<IUltimateATK, 'id' | 'name'> | null;
  owners?: Pick<IUserProfile, 'id'>[] | null;
}

export type NewCharacterCard = Omit<ICharacterCard, 'id'> & { id: null };

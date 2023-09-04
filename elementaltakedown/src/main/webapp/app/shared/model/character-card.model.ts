import { IBasicATK } from 'app/shared/model/basic-atk.model';
import { ISkillATK } from 'app/shared/model/skill-atk.model';
import { IUltimateATK } from 'app/shared/model/ultimate-atk.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { ElementType } from 'app/shared/model/enumerations/element-type.model';

export interface ICharacterCard {
  id?: number;
  name?: string;
  element?: ElementType;
  basic?: IBasicATK;
  skill?: ISkillATK;
  ultimate?: IUltimateATK;
  owners?: IUserProfile[] | null;
}

export const defaultValue: Readonly<ICharacterCard> = {};

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICharacterCard, NewCharacterCard } from '../character-card.model';
import { IArchiveCard } from '../archive.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICharacterCard for edit and NewCharacterCardFormGroupInput for create.
 */
// type CharacterCardFormGroupInput = ICharacterCard | PartialWithRequiredKeyOf<NewCharacterCard>;
//
// type CharacterCardFormDefaults = Pick<NewCharacterCard, 'id' | 'owners'>;

// type CharacterCardFormGroupContent = {
//   id: FormControl<ICharacterCard['id'] | NewCharacterCard['id']>;
//   name: FormControl<ICharacterCard['name']>;
//   element: FormControl<ICharacterCard['element']>;
//   basic: FormControl<ICharacterCard['basic']>;
//   skill: FormControl<ICharacterCard['skill']>;
//   ultimate: FormControl<ICharacterCard['ultimate']>;
//   owners: FormControl<ICharacterCard['owners']>;
// };

// export type CharacterCardFormGroup = FormGroup<CharacterCardFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ArchiveFormService {

    getCheckedCardsOnly(allCards: IArchiveCard[] = []){
      var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
      var checkedCards: number[] = [];

      for(let i = 0; i < markedCheckbox.length; i++){
        checkedCards.push(parseInt(markedCheckbox[i].id));
      }
      var returnCards: ICharacterCard[] = [];

      for(let i = 0; i < allCards.length; i++){
        if(checkedCards.includes(allCards[i].id)){
          returnCards.push(this.convertToICard(allCards[i]));
        }
      }
//       for(let i = 0; i < returnCards.length; i++){
//         console.log(returnCards[i]);
//       }
      return returnCards;
    }

    convertToICard(singleCard: IArchiveCard): ICharacterCard{
      delete singleCard.playerHasCard;
      return singleCard;
    }
}

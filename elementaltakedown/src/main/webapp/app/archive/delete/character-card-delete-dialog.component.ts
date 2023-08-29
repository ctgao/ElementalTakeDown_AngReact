import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICharacterCard } from '../character-card.model';
import { CharacterCardService } from '../service/character-card.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './character-card-delete-dialog.component.html',
})
export class CharacterCardDeleteDialogComponent {
  characterCard?: ICharacterCard;

  constructor(protected characterCardService: CharacterCardService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.characterCardService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

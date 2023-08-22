import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUltimateATK } from '../ultimate-atk.model';
import { UltimateATKService } from '../service/ultimate-atk.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ultimate-atk-delete-dialog.component.html',
})
export class UltimateATKDeleteDialogComponent {
  ultimateATK?: IUltimateATK;

  constructor(protected ultimateATKService: UltimateATKService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ultimateATKService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

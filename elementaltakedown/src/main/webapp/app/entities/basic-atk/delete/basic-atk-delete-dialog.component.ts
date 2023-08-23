import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBasicATK } from '../basic-atk.model';
import { BasicATKService } from '../service/basic-atk.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './basic-atk-delete-dialog.component.html',
})
export class BasicATKDeleteDialogComponent {
  basicATK?: IBasicATK;

  constructor(protected basicATKService: BasicATKService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.basicATKService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkillATK } from '../skill-atk.model';
import { SkillATKService } from '../service/skill-atk.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './skill-atk-delete-dialog.component.html',
})
export class SkillATKDeleteDialogComponent {
  skillATK?: ISkillATK;

  constructor(protected skillATKService: SkillATKService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skillATKService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SkillATKComponent } from './list/skill-atk.component';
import { SkillATKDetailComponent } from './detail/skill-atk-detail.component';
import { SkillATKUpdateComponent } from './update/skill-atk-update.component';
import { SkillATKDeleteDialogComponent } from './delete/skill-atk-delete-dialog.component';
import { SkillATKRoutingModule } from './route/skill-atk-routing.module';

@NgModule({
  imports: [SharedModule, SkillATKRoutingModule],
  declarations: [SkillATKComponent, SkillATKDetailComponent, SkillATKUpdateComponent, SkillATKDeleteDialogComponent],
})
export class SkillATKModule {}

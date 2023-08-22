import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BasicATKComponent } from './list/basic-atk.component';
import { BasicATKDetailComponent } from './detail/basic-atk-detail.component';
import { BasicATKUpdateComponent } from './update/basic-atk-update.component';
import { BasicATKDeleteDialogComponent } from './delete/basic-atk-delete-dialog.component';
import { BasicATKRoutingModule } from './route/basic-atk-routing.module';

@NgModule({
  imports: [SharedModule, BasicATKRoutingModule],
  declarations: [BasicATKComponent, BasicATKDetailComponent, BasicATKUpdateComponent, BasicATKDeleteDialogComponent],
})
export class BasicATKModule {}

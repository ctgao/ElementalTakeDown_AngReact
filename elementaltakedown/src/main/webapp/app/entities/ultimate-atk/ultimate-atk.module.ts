import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UltimateATKComponent } from './list/ultimate-atk.component';
import { UltimateATKDetailComponent } from './detail/ultimate-atk-detail.component';
import { UltimateATKUpdateComponent } from './update/ultimate-atk-update.component';
import { UltimateATKDeleteDialogComponent } from './delete/ultimate-atk-delete-dialog.component';
import { UltimateATKRoutingModule } from './route/ultimate-atk-routing.module';

@NgModule({
  imports: [SharedModule, UltimateATKRoutingModule],
  declarations: [UltimateATKComponent, UltimateATKDetailComponent, UltimateATKUpdateComponent, UltimateATKDeleteDialogComponent],
})
export class UltimateATKModule {}

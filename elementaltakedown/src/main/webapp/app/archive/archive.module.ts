import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CharacterCardComponent } from './list/character-card.component';
import { CharacterCardDetailComponent } from './detail/character-card-detail.component';
import { CharacterCardUpdateComponent } from './update/character-card-update.component';
import { CharacterCardRoutingModule } from './route/character-card-routing.module';

@NgModule({
  imports: [SharedModule, CharacterCardRoutingModule],
  declarations: [CharacterCardComponent, CharacterCardDetailComponent, CharacterCardUpdateComponent],
})
export class ArchiveModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CharacterCardComponent } from '../list/character-card.component';
import { CharacterCardDetailComponent } from '../detail/character-card-detail.component';
import { CharacterCardUpdateComponent } from '../update/character-card-update.component';
import { CharacterCardRoutingResolveService } from './character-card-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const characterCardRoute: Routes = [
  {
    path: '',
    component: CharacterCardComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CharacterCardDetailComponent,
    resolve: {
      characterCard: CharacterCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CharacterCardUpdateComponent,
    resolve: {
      characterCard: CharacterCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CharacterCardUpdateComponent,
    resolve: {
      characterCard: CharacterCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(characterCardRoute)],
  exports: [RouterModule],
})
export class CharacterCardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DamageComponent } from '../list/damage.component';
import { DamageDetailComponent } from '../detail/damage-detail.component';
import { DamageUpdateComponent } from '../update/damage-update.component';
import { DamageRoutingResolveService } from './damage-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const damageRoute: Routes = [
  {
    path: '',
    component: DamageComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DamageDetailComponent,
    resolve: {
      damage: DamageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DamageUpdateComponent,
    resolve: {
      damage: DamageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DamageUpdateComponent,
    resolve: {
      damage: DamageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(damageRoute)],
  exports: [RouterModule],
})
export class DamageRoutingModule {}

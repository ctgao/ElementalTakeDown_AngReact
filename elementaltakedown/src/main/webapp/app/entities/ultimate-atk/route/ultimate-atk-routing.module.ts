import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UltimateATKComponent } from '../list/ultimate-atk.component';
import { UltimateATKDetailComponent } from '../detail/ultimate-atk-detail.component';
import { UltimateATKUpdateComponent } from '../update/ultimate-atk-update.component';
import { UltimateATKRoutingResolveService } from './ultimate-atk-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ultimateATKRoute: Routes = [
  {
    path: '',
    component: UltimateATKComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UltimateATKDetailComponent,
    resolve: {
      ultimateATK: UltimateATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UltimateATKUpdateComponent,
    resolve: {
      ultimateATK: UltimateATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UltimateATKUpdateComponent,
    resolve: {
      ultimateATK: UltimateATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ultimateATKRoute)],
  exports: [RouterModule],
})
export class UltimateATKRoutingModule {}

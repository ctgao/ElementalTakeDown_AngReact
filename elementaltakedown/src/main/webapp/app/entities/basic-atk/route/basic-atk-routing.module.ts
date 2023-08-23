import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BasicATKComponent } from '../list/basic-atk.component';
import { BasicATKDetailComponent } from '../detail/basic-atk-detail.component';
import { BasicATKUpdateComponent } from '../update/basic-atk-update.component';
import { BasicATKRoutingResolveService } from './basic-atk-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const basicATKRoute: Routes = [
  {
    path: '',
    component: BasicATKComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BasicATKDetailComponent,
    resolve: {
      basicATK: BasicATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BasicATKUpdateComponent,
    resolve: {
      basicATK: BasicATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BasicATKUpdateComponent,
    resolve: {
      basicATK: BasicATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(basicATKRoute)],
  exports: [RouterModule],
})
export class BasicATKRoutingModule {}

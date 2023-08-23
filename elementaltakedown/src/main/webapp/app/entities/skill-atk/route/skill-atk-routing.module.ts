import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SkillATKComponent } from '../list/skill-atk.component';
import { SkillATKDetailComponent } from '../detail/skill-atk-detail.component';
import { SkillATKUpdateComponent } from '../update/skill-atk-update.component';
import { SkillATKRoutingResolveService } from './skill-atk-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const skillATKRoute: Routes = [
  {
    path: '',
    component: SkillATKComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SkillATKDetailComponent,
    resolve: {
      skillATK: SkillATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SkillATKUpdateComponent,
    resolve: {
      skillATK: SkillATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SkillATKUpdateComponent,
    resolve: {
      skillATK: SkillATKRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(skillATKRoute)],
  exports: [RouterModule],
})
export class SkillATKRoutingModule {}

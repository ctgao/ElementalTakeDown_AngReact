import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'character-card',
        data: { pageTitle: 'elementaltakedownApp.characterCard.home.title' },
        loadChildren: () => import('./character-card/character-card.module').then(m => m.CharacterCardModule),
      },
      {
        path: 'basic-atk',
        data: { pageTitle: 'elementaltakedownApp.basicATK.home.title' },
        loadChildren: () => import('./basic-atk/basic-atk.module').then(m => m.BasicATKModule),
      },
      {
        path: 'skill-atk',
        data: { pageTitle: 'elementaltakedownApp.skillATK.home.title' },
        loadChildren: () => import('./skill-atk/skill-atk.module').then(m => m.SkillATKModule),
      },
      {
        path: 'ultimate-atk',
        data: { pageTitle: 'elementaltakedownApp.ultimateATK.home.title' },
        loadChildren: () => import('./ultimate-atk/ultimate-atk.module').then(m => m.UltimateATKModule),
      },
      {
        path: 'damage',
        data: { pageTitle: 'elementaltakedownApp.damage.home.title' },
        loadChildren: () => import('./damage/damage.module').then(m => m.DamageModule),
      },
      {
        path: 'user-profile',
        data: { pageTitle: 'elementaltakedownApp.userProfile.home.title' },
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

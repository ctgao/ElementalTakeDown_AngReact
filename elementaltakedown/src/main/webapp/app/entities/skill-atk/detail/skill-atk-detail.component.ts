import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISkillATK } from '../skill-atk.model';

@Component({
  selector: 'jhi-skill-atk-detail',
  templateUrl: './skill-atk-detail.component.html',
})
export class SkillATKDetailComponent implements OnInit {
  skillATK: ISkillATK | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillATK }) => {
      this.skillATK = skillATK;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

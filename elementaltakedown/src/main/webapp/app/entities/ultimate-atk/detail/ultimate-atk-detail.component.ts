import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUltimateATK } from '../ultimate-atk.model';

@Component({
  selector: 'jhi-ultimate-atk-detail',
  templateUrl: './ultimate-atk-detail.component.html',
})
export class UltimateATKDetailComponent implements OnInit {
  ultimateATK: IUltimateATK | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ultimateATK }) => {
      this.ultimateATK = ultimateATK;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

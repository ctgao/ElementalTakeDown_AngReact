import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBasicATK } from '../basic-atk.model';

@Component({
  selector: 'jhi-basic-atk-detail',
  templateUrl: './basic-atk-detail.component.html',
})
export class BasicATKDetailComponent implements OnInit {
  basicATK: IBasicATK | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basicATK }) => {
      this.basicATK = basicATK;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

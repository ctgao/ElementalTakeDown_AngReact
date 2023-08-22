import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharacterCard } from '../character-card.model';

@Component({
  selector: 'jhi-character-card-detail',
  templateUrl: './character-card-detail.component.html',
})
export class CharacterCardDetailComponent implements OnInit {
  characterCard: ICharacterCard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ characterCard }) => {
      this.characterCard = characterCard;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

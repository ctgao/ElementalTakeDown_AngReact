import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CharacterCardFormService, CharacterCardFormGroup } from './character-card-form.service';
import { ICharacterCard } from '../character-card.model';
import { CharacterCardService } from '../service/character-card.service';
import { IBasicATK } from 'app/entities/basic-atk/basic-atk.model';
import { BasicATKService } from 'app/entities/basic-atk/service/basic-atk.service';
import { ISkillATK } from 'app/entities/skill-atk/skill-atk.model';
import { SkillATKService } from 'app/entities/skill-atk/service/skill-atk.service';
import { IUltimateATK } from 'app/entities/ultimate-atk/ultimate-atk.model';
import { UltimateATKService } from 'app/entities/ultimate-atk/service/ultimate-atk.service';
import { ElementType } from 'app/entities/enumerations/element-type.model';

@Component({
  selector: 'jhi-character-card-update',
  templateUrl: './character-card-update.component.html',
})
export class CharacterCardUpdateComponent implements OnInit {
  isSaving = false;
  characterCard: ICharacterCard | null = null;
  elementTypeValues = Object.keys(ElementType);

  basicATKSSharedCollection: IBasicATK[] = [];
  skillATKSSharedCollection: ISkillATK[] = [];
  ultimateATKSSharedCollection: IUltimateATK[] = [];

  editForm: CharacterCardFormGroup = this.characterCardFormService.createCharacterCardFormGroup();

  constructor(
    protected characterCardService: CharacterCardService,
    protected characterCardFormService: CharacterCardFormService,
    protected basicATKService: BasicATKService,
    protected skillATKService: SkillATKService,
    protected ultimateATKService: UltimateATKService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareBasicATK = (o1: IBasicATK | null, o2: IBasicATK | null): boolean => this.basicATKService.compareBasicATK(o1, o2);

  compareSkillATK = (o1: ISkillATK | null, o2: ISkillATK | null): boolean => this.skillATKService.compareSkillATK(o1, o2);

  compareUltimateATK = (o1: IUltimateATK | null, o2: IUltimateATK | null): boolean => this.ultimateATKService.compareUltimateATK(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ characterCard }) => {
      this.characterCard = characterCard;
      if (characterCard) {
        this.updateForm(characterCard);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const characterCard = this.characterCardFormService.getCharacterCard(this.editForm);
    if (characterCard.id !== null) {
      this.subscribeToSaveResponse(this.characterCardService.update(characterCard));
    } else {
      this.subscribeToSaveResponse(this.characterCardService.create(characterCard));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICharacterCard>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(characterCard: ICharacterCard): void {
    this.characterCard = characterCard;
    this.characterCardFormService.resetForm(this.editForm, characterCard);

    this.basicATKSSharedCollection = this.basicATKService.addBasicATKToCollectionIfMissing<IBasicATK>(
      this.basicATKSSharedCollection,
      characterCard.basic
    );
    this.skillATKSSharedCollection = this.skillATKService.addSkillATKToCollectionIfMissing<ISkillATK>(
      this.skillATKSSharedCollection,
      characterCard.skill
    );
    this.ultimateATKSSharedCollection = this.ultimateATKService.addUltimateATKToCollectionIfMissing<IUltimateATK>(
      this.ultimateATKSSharedCollection,
      characterCard.ultimate
    );
  }

  protected loadRelationshipsOptions(): void {
    this.basicATKService
      .query()
      .pipe(map((res: HttpResponse<IBasicATK[]>) => res.body ?? []))
      .pipe(
        map((basicATKS: IBasicATK[]) =>
          this.basicATKService.addBasicATKToCollectionIfMissing<IBasicATK>(basicATKS, this.characterCard?.basic)
        )
      )
      .subscribe((basicATKS: IBasicATK[]) => (this.basicATKSSharedCollection = basicATKS));

    this.skillATKService
      .query()
      .pipe(map((res: HttpResponse<ISkillATK[]>) => res.body ?? []))
      .pipe(
        map((skillATKS: ISkillATK[]) =>
          this.skillATKService.addSkillATKToCollectionIfMissing<ISkillATK>(skillATKS, this.characterCard?.skill)
        )
      )
      .subscribe((skillATKS: ISkillATK[]) => (this.skillATKSSharedCollection = skillATKS));

    this.ultimateATKService
      .query()
      .pipe(map((res: HttpResponse<IUltimateATK[]>) => res.body ?? []))
      .pipe(
        map((ultimateATKS: IUltimateATK[]) =>
          this.ultimateATKService.addUltimateATKToCollectionIfMissing<IUltimateATK>(ultimateATKS, this.characterCard?.ultimate)
        )
      )
      .subscribe((ultimateATKS: IUltimateATK[]) => (this.ultimateATKSSharedCollection = ultimateATKS));
  }
}

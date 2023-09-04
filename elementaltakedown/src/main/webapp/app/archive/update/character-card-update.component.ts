import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap, forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICharacterCard } from '../character-card.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, ArchiveService } from '../service/character-card.service';
import { SortService } from 'app/shared/sort/sort.service';
import { IArchiveCard } from '../archive.model';

import { ArchiveFormService } from './character-card-form.service';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';
// import { UserProfileService } from 'app/entities/user-profile/service/user-profile.service';
// import { EntityArrayResponseType, CharacterCardService } from '../service/character-card.service';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-character-card-update',
  templateUrl: './character-card-update.component.html',
})
export class CharacterCardUpdateComponent implements OnInit {
  isSaving = false;
  account: Account | null = null;

  predicate = 'id';
  ascending = true;

  allCharacters?: IArchiveCard[];

//   userProfile: IUserProfile | null = null;

//   editForm: UserProfileFormGroup = this.userProfileFormService.createUserProfileFormGroup();

  constructor(
//     protected userProfileService: UserProfileService,
    protected userProfileFormService: ArchiveFormService,
    private accountService: AccountService,
    protected characterCardService: ArchiveService,
    protected activatedRoute: ActivatedRoute
  ) {}

  trackId = (_index: number, item: ICharacterCard): number => this.characterCardService.getCharacterCardIdentifier(item);

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

    this.loadRelationshipsOptions();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.log("saving");
    this.isSaving = true;
    var cardsToUpdate = this.userProfileFormService.getCheckedCardsOnly(this.allCharacters);
    const loginToFind = this.account ? this.account.login : "";
    this.subscribeToSaveResponse(this.characterCardService.update(loginToFind, cardsToUpdate));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>): void {
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

  protected loadRelationshipsOptions(): void {
    const loginToFind = this.account ? this.account.login : "";

    forkJoin(
      this.characterCardService
        .query("")
        .pipe(map((res: HttpResponse<ICharacterCard[]>) => res.body ?? []))
      , this.characterCardService
        .query(loginToFind)
        .pipe(map((res: HttpResponse<ICharacterCard[]>) => res.body ?? []))
      ).subscribe(([allCards, myCards]: [ICharacterCard[], ICharacterCard[]]) => {
        this.allCharacters = allCards;
        let ownedCards = myCards.map(a => a.id);

        for(let i = 0; i < allCards.length; i++){
          this.allCharacters[i].playerHasCard = ownedCards.includes(allCards[i].id) ? "true" : '';
        }
      })
  }
}

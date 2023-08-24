import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserProfileFormService, UserProfileFormGroup } from './user-profile-form.service';
import { IUserProfile } from '../user-profile.model';
import { UserProfileService } from '../service/user-profile.service';
import { ICharacterCard } from 'app/entities/character-card/character-card.model';
import { CharacterCardService } from 'app/entities/character-card/service/character-card.service';

@Component({
  selector: 'jhi-user-profile-update',
  templateUrl: './user-profile-update.component.html',
})
export class UserProfileUpdateComponent implements OnInit {
  isSaving = false;
  userProfile: IUserProfile | null = null;

  characterCardsSharedCollection: ICharacterCard[] = [];

  editForm: UserProfileFormGroup = this.userProfileFormService.createUserProfileFormGroup();

  constructor(
    protected userProfileService: UserProfileService,
    protected userProfileFormService: UserProfileFormService,
    protected characterCardService: CharacterCardService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCharacterCard = (o1: ICharacterCard | null, o2: ICharacterCard | null): boolean =>
    this.characterCardService.compareCharacterCard(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userProfile }) => {
      this.userProfile = userProfile;
      if (userProfile) {
        this.updateForm(userProfile);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userProfile = this.userProfileFormService.getUserProfile(this.editForm);
    if (userProfile.id !== null) {
      this.subscribeToSaveResponse(this.userProfileService.update(userProfile));
    } else {
      this.subscribeToSaveResponse(this.userProfileService.create(userProfile));
    }
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

  protected updateForm(userProfile: IUserProfile): void {
    this.userProfile = userProfile;
    this.userProfileFormService.resetForm(this.editForm, userProfile);

    this.characterCardsSharedCollection = this.characterCardService.addCharacterCardToCollectionIfMissing<ICharacterCard>(
      this.characterCardsSharedCollection,
      ...(userProfile.cards ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.characterCardService
      .query()
      .pipe(map((res: HttpResponse<ICharacterCard[]>) => res.body ?? []))
      .pipe(
        map((characterCards: ICharacterCard[]) =>
          this.characterCardService.addCharacterCardToCollectionIfMissing<ICharacterCard>(
            characterCards,
            ...(this.userProfile?.cards ?? [])
          )
        )
      )
      .subscribe((characterCards: ICharacterCard[]) => (this.characterCardsSharedCollection = characterCards));
  }
}

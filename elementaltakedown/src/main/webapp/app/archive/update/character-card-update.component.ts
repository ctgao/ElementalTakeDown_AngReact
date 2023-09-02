import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICharacterCard } from '../character-card.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, CharacterCardService } from '../service/character-card.service';
import { SortService } from 'app/shared/sort/sort.service';

// import { UserProfileFormService, UserProfileFormGroup } from 'app/entities/user-profile/user-profile-form.service';
// import { IUserProfile } from 'app/entities/user-profile/user-profile.model';
// import { UserProfileService } from 'app/entities/user-profile/service/user-profile.service';
// import { IUser } from 'app/entities/user/user.model';
// import { UserService } from 'app/entities/user/user.service';
// import { ICharacterCard } from '../character-card.model';
// import { EntityArrayResponseType, CharacterCardService } from '../service/character-card.service';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-character-card-update',
  templateUrl: './character-card-update.component.html',
})
export class CharacterCardUpdateComponent implements OnInit {
  isSaving = false;
  isLoading = false;
  account: Account | null = null;

  predicate = 'id';
  ascending = true;

  allCharacters?: ICharacterCard[];
  characterCards?: ICharacterCard[];

//   editForm: UserProfileFormGroup = this.userProfileFormService.createUserProfileFormGroup();

  constructor(
    protected characterCardService: CharacterCardService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    private accountService: AccountService,
    protected modalService: NgbModal
  ) {}

//   compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);
//
//   compareCharacterCard = (o1: ICharacterCard | null, o2: ICharacterCard | null): boolean =>
//     this.characterCardService.compareCharacterCard(o1, o2);

  trackId = (_index: number, item: ICharacterCard): number => this.characterCardService.getCharacterCardIdentifier(item);

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.loadAll();
//     this.loadMine();
  }

  loadAll(): void {
    this.loadAllFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccessAll(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadAllFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    console.log(this.activatedRoute);
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(false, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    console.log(params);
    console.log(data);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccessAll(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.allCharacters = this.refineData(dataFromBody);
  }

  protected refineData(data: ICharacterCard[]): ICharacterCard[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: ICharacterCard[] | null): ICharacterCard[] {
    return data ?? [];
  }

  protected queryBackend(loggedin: boolean, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    const loginToFind = this.account ? this.account.login : "";
    const youLoggin = loggedin ? loginToFind : "";
    return this.characterCardService.query(youLoggin, queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

 save(): void {
//     this.isSaving = true;
//     const characterCard = this.characterCardFormService.getCharacterCard(this.editForm);
//     if (characterCard.id !== null) {
//       this.subscribeToSaveResponse(this.characterCardService.update(characterCard));
//     } else {
//       this.subscribeToSaveResponse(this.characterCardService.create(characterCard));
//     }
  }

  previousState(): void {
    window.history.back();
  }
}

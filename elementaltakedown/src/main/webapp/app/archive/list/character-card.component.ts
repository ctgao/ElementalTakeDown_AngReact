import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICharacterCard } from '../character-card.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, CharacterCardService } from '../service/character-card.service';
import { SortService } from 'app/shared/sort/sort.service';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-character-card',
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent implements OnInit {
  characterCards?: ICharacterCard[];
  isLoading = false;
  account: Account | null = null;

  predicate = 'id';
  ascending = true;

  constructor(
    protected characterCardService: CharacterCardService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    private accountService: AccountService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: ICharacterCard): number => this.characterCardService.getCharacterCardIdentifier(item);

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.load();
//     console.log(this.account);
  }

//   delete(characterCard: ICharacterCard): void {
//     const modalRef = this.modalService.open(CharacterCardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
//     modalRef.componentInstance.characterCard = characterCard;
//     // unsubscribe not needed because closed completes on modal close
//     modalRef.closed
//       .pipe(
//         filter(reason => reason === ITEM_DELETED_EVENT),
//         switchMap(() => this.loadFromBackendWithRouteInformations())
//       )
//       .subscribe({
//         next: (res: EntityArrayResponseType) => {
//           this.onResponseSuccess(res);
//         },
//       });
//   }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.characterCards = this.refineData(dataFromBody);
  }

  protected refineData(data: ICharacterCard[]): ICharacterCard[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: ICharacterCard[] | null): ICharacterCard[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    const loginToFind = this.account ? this.account.login : "";
    return this.characterCardService.query(loginToFind, queryObject).pipe(tap(() => (this.isLoading = false)));
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
}

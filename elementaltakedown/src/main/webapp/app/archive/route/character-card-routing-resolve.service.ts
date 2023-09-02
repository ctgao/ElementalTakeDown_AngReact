import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICharacterCard } from '../character-card.model';
import { ArchiveService } from '../service/character-card.service';

@Injectable({ providedIn: 'root' })
export class CharacterCardRoutingResolveService implements Resolve<ICharacterCard | null> {
  constructor(protected service: ArchiveService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICharacterCard | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((characterCard: HttpResponse<ICharacterCard>) => {
          if (characterCard.body) {
            return of(characterCard.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}

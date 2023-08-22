import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUltimateATK } from '../ultimate-atk.model';
import { UltimateATKService } from '../service/ultimate-atk.service';

@Injectable({ providedIn: 'root' })
export class UltimateATKRoutingResolveService implements Resolve<IUltimateATK | null> {
  constructor(protected service: UltimateATKService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUltimateATK | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ultimateATK: HttpResponse<IUltimateATK>) => {
          if (ultimateATK.body) {
            return of(ultimateATK.body);
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

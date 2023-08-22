import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBasicATK } from '../basic-atk.model';
import { BasicATKService } from '../service/basic-atk.service';

@Injectable({ providedIn: 'root' })
export class BasicATKRoutingResolveService implements Resolve<IBasicATK | null> {
  constructor(protected service: BasicATKService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBasicATK | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((basicATK: HttpResponse<IBasicATK>) => {
          if (basicATK.body) {
            return of(basicATK.body);
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

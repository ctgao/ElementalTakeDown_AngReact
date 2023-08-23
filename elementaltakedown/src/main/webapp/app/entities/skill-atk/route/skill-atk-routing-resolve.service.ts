import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISkillATK } from '../skill-atk.model';
import { SkillATKService } from '../service/skill-atk.service';

@Injectable({ providedIn: 'root' })
export class SkillATKRoutingResolveService implements Resolve<ISkillATK | null> {
  constructor(protected service: SkillATKService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkillATK | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((skillATK: HttpResponse<ISkillATK>) => {
          if (skillATK.body) {
            return of(skillATK.body);
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

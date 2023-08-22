import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDamage, NewDamage } from '../damage.model';

export type PartialUpdateDamage = Partial<IDamage> & Pick<IDamage, 'id'>;

export type EntityResponseType = HttpResponse<IDamage>;
export type EntityArrayResponseType = HttpResponse<IDamage[]>;

@Injectable({ providedIn: 'root' })
export class DamageService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/damages');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(damage: NewDamage): Observable<EntityResponseType> {
    return this.http.post<IDamage>(this.resourceUrl, damage, { observe: 'response' });
  }

  update(damage: IDamage): Observable<EntityResponseType> {
    return this.http.put<IDamage>(`${this.resourceUrl}/${this.getDamageIdentifier(damage)}`, damage, { observe: 'response' });
  }

  partialUpdate(damage: PartialUpdateDamage): Observable<EntityResponseType> {
    return this.http.patch<IDamage>(`${this.resourceUrl}/${this.getDamageIdentifier(damage)}`, damage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDamage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDamage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDamageIdentifier(damage: Pick<IDamage, 'id'>): number {
    return damage.id;
  }

  compareDamage(o1: Pick<IDamage, 'id'> | null, o2: Pick<IDamage, 'id'> | null): boolean {
    return o1 && o2 ? this.getDamageIdentifier(o1) === this.getDamageIdentifier(o2) : o1 === o2;
  }

  addDamageToCollectionIfMissing<Type extends Pick<IDamage, 'id'>>(
    damageCollection: Type[],
    ...damagesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const damages: Type[] = damagesToCheck.filter(isPresent);
    if (damages.length > 0) {
      const damageCollectionIdentifiers = damageCollection.map(damageItem => this.getDamageIdentifier(damageItem)!);
      const damagesToAdd = damages.filter(damageItem => {
        const damageIdentifier = this.getDamageIdentifier(damageItem);
        if (damageCollectionIdentifiers.includes(damageIdentifier)) {
          return false;
        }
        damageCollectionIdentifiers.push(damageIdentifier);
        return true;
      });
      return [...damagesToAdd, ...damageCollection];
    }
    return damageCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUltimateATK, NewUltimateATK } from '../ultimate-atk.model';

export type PartialUpdateUltimateATK = Partial<IUltimateATK> & Pick<IUltimateATK, 'id'>;

export type EntityResponseType = HttpResponse<IUltimateATK>;
export type EntityArrayResponseType = HttpResponse<IUltimateATK[]>;

@Injectable({ providedIn: 'root' })
export class UltimateATKService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ultimate-atks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ultimateATK: NewUltimateATK): Observable<EntityResponseType> {
    return this.http.post<IUltimateATK>(this.resourceUrl, ultimateATK, { observe: 'response' });
  }

  update(ultimateATK: IUltimateATK): Observable<EntityResponseType> {
    return this.http.put<IUltimateATK>(`${this.resourceUrl}/${this.getUltimateATKIdentifier(ultimateATK)}`, ultimateATK, {
      observe: 'response',
    });
  }

  partialUpdate(ultimateATK: PartialUpdateUltimateATK): Observable<EntityResponseType> {
    return this.http.patch<IUltimateATK>(`${this.resourceUrl}/${this.getUltimateATKIdentifier(ultimateATK)}`, ultimateATK, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUltimateATK>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUltimateATK[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUltimateATKIdentifier(ultimateATK: Pick<IUltimateATK, 'id'>): number {
    return ultimateATK.id;
  }

  compareUltimateATK(o1: Pick<IUltimateATK, 'id'> | null, o2: Pick<IUltimateATK, 'id'> | null): boolean {
    return o1 && o2 ? this.getUltimateATKIdentifier(o1) === this.getUltimateATKIdentifier(o2) : o1 === o2;
  }

  addUltimateATKToCollectionIfMissing<Type extends Pick<IUltimateATK, 'id'>>(
    ultimateATKCollection: Type[],
    ...ultimateATKSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ultimateATKS: Type[] = ultimateATKSToCheck.filter(isPresent);
    if (ultimateATKS.length > 0) {
      const ultimateATKCollectionIdentifiers = ultimateATKCollection.map(
        ultimateATKItem => this.getUltimateATKIdentifier(ultimateATKItem)!
      );
      const ultimateATKSToAdd = ultimateATKS.filter(ultimateATKItem => {
        const ultimateATKIdentifier = this.getUltimateATKIdentifier(ultimateATKItem);
        if (ultimateATKCollectionIdentifiers.includes(ultimateATKIdentifier)) {
          return false;
        }
        ultimateATKCollectionIdentifiers.push(ultimateATKIdentifier);
        return true;
      });
      return [...ultimateATKSToAdd, ...ultimateATKCollection];
    }
    return ultimateATKCollection;
  }
}

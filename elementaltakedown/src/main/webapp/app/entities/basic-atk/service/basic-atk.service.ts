import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBasicATK, NewBasicATK } from '../basic-atk.model';

export type PartialUpdateBasicATK = Partial<IBasicATK> & Pick<IBasicATK, 'id'>;

export type EntityResponseType = HttpResponse<IBasicATK>;
export type EntityArrayResponseType = HttpResponse<IBasicATK[]>;

@Injectable({ providedIn: 'root' })
export class BasicATKService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/basic-atks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(basicATK: NewBasicATK): Observable<EntityResponseType> {
    return this.http.post<IBasicATK>(this.resourceUrl, basicATK, { observe: 'response' });
  }

  update(basicATK: IBasicATK): Observable<EntityResponseType> {
    return this.http.put<IBasicATK>(`${this.resourceUrl}/${this.getBasicATKIdentifier(basicATK)}`, basicATK, { observe: 'response' });
  }

  partialUpdate(basicATK: PartialUpdateBasicATK): Observable<EntityResponseType> {
    return this.http.patch<IBasicATK>(`${this.resourceUrl}/${this.getBasicATKIdentifier(basicATK)}`, basicATK, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBasicATK>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBasicATK[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBasicATKIdentifier(basicATK: Pick<IBasicATK, 'id'>): number {
    return basicATK.id;
  }

  compareBasicATK(o1: Pick<IBasicATK, 'id'> | null, o2: Pick<IBasicATK, 'id'> | null): boolean {
    return o1 && o2 ? this.getBasicATKIdentifier(o1) === this.getBasicATKIdentifier(o2) : o1 === o2;
  }

  addBasicATKToCollectionIfMissing<Type extends Pick<IBasicATK, 'id'>>(
    basicATKCollection: Type[],
    ...basicATKSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const basicATKS: Type[] = basicATKSToCheck.filter(isPresent);
    if (basicATKS.length > 0) {
      const basicATKCollectionIdentifiers = basicATKCollection.map(basicATKItem => this.getBasicATKIdentifier(basicATKItem)!);
      const basicATKSToAdd = basicATKS.filter(basicATKItem => {
        const basicATKIdentifier = this.getBasicATKIdentifier(basicATKItem);
        if (basicATKCollectionIdentifiers.includes(basicATKIdentifier)) {
          return false;
        }
        basicATKCollectionIdentifiers.push(basicATKIdentifier);
        return true;
      });
      return [...basicATKSToAdd, ...basicATKCollection];
    }
    return basicATKCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISkillATK, NewSkillATK } from '../skill-atk.model';

export type PartialUpdateSkillATK = Partial<ISkillATK> & Pick<ISkillATK, 'id'>;

export type EntityResponseType = HttpResponse<ISkillATK>;
export type EntityArrayResponseType = HttpResponse<ISkillATK[]>;

@Injectable({ providedIn: 'root' })
export class SkillATKService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/skill-atks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(skillATK: NewSkillATK): Observable<EntityResponseType> {
    return this.http.post<ISkillATK>(this.resourceUrl, skillATK, { observe: 'response' });
  }

  update(skillATK: ISkillATK): Observable<EntityResponseType> {
    return this.http.put<ISkillATK>(`${this.resourceUrl}/${this.getSkillATKIdentifier(skillATK)}`, skillATK, { observe: 'response' });
  }

  partialUpdate(skillATK: PartialUpdateSkillATK): Observable<EntityResponseType> {
    return this.http.patch<ISkillATK>(`${this.resourceUrl}/${this.getSkillATKIdentifier(skillATK)}`, skillATK, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkillATK>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkillATK[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSkillATKIdentifier(skillATK: Pick<ISkillATK, 'id'>): number {
    return skillATK.id;
  }

  compareSkillATK(o1: Pick<ISkillATK, 'id'> | null, o2: Pick<ISkillATK, 'id'> | null): boolean {
    return o1 && o2 ? this.getSkillATKIdentifier(o1) === this.getSkillATKIdentifier(o2) : o1 === o2;
  }

  addSkillATKToCollectionIfMissing<Type extends Pick<ISkillATK, 'id'>>(
    skillATKCollection: Type[],
    ...skillATKSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const skillATKS: Type[] = skillATKSToCheck.filter(isPresent);
    if (skillATKS.length > 0) {
      const skillATKCollectionIdentifiers = skillATKCollection.map(skillATKItem => this.getSkillATKIdentifier(skillATKItem)!);
      const skillATKSToAdd = skillATKS.filter(skillATKItem => {
        const skillATKIdentifier = this.getSkillATKIdentifier(skillATKItem);
        if (skillATKCollectionIdentifiers.includes(skillATKIdentifier)) {
          return false;
        }
        skillATKCollectionIdentifiers.push(skillATKIdentifier);
        return true;
      });
      return [...skillATKSToAdd, ...skillATKCollection];
    }
    return skillATKCollection;
  }
}

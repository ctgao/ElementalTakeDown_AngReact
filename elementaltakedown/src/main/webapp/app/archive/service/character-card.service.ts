import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICharacterCard, NewCharacterCard } from '../character-card.model';

export type PartialUpdateCharacterCard = Partial<ICharacterCard> & Pick<ICharacterCard, 'id'>;

export type EntityResponseType = HttpResponse<ICharacterCard>;
export type EntityArrayResponseType = HttpResponse<ICharacterCard[]>;

@Injectable({ providedIn: 'root' })
export class CharacterCardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/character-cards');
  protected archiveResourceUrl = this.applicationConfigService.getEndpointFor('archive');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(characterCard: NewCharacterCard): Observable<EntityResponseType> {
    return this.http.post<ICharacterCard>(this.resourceUrl, characterCard, { observe: 'response' });
  }

  update(characterCard: ICharacterCard): Observable<EntityResponseType> {
    return this.http.put<ICharacterCard>(`${this.resourceUrl}/${this.getCharacterCardIdentifier(characterCard)}`, characterCard, {
      observe: 'response',
    });
  }

  partialUpdate(characterCard: PartialUpdateCharacterCard): Observable<EntityResponseType> {
    return this.http.patch<ICharacterCard>(`${this.resourceUrl}/${this.getCharacterCardIdentifier(characterCard)}`, characterCard, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICharacterCard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

// is it this???
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    // ??? where do we get this from???
//     return this.http.get<ICharacterCard[]>(`archive/${login}`, { params: options, observe: 'response' });
    return this.http.get<ICharacterCard[]>(`${this.archiveResourceUrl}/admin`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCharacterCardIdentifier(characterCard: Pick<ICharacterCard, 'id'>): number {
    return characterCard.id;
  }

  compareCharacterCard(o1: Pick<ICharacterCard, 'id'> | null, o2: Pick<ICharacterCard, 'id'> | null): boolean {
    return o1 && o2 ? this.getCharacterCardIdentifier(o1) === this.getCharacterCardIdentifier(o2) : o1 === o2;
  }

  addCharacterCardToCollectionIfMissing<Type extends Pick<ICharacterCard, 'id'>>(
    characterCardCollection: Type[],
    ...characterCardsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const characterCards: Type[] = characterCardsToCheck.filter(isPresent);
    if (characterCards.length > 0) {
      const characterCardCollectionIdentifiers = characterCardCollection.map(
        characterCardItem => this.getCharacterCardIdentifier(characterCardItem)!
      );
      const characterCardsToAdd = characterCards.filter(characterCardItem => {
        const characterCardIdentifier = this.getCharacterCardIdentifier(characterCardItem);
        if (characterCardCollectionIdentifiers.includes(characterCardIdentifier)) {
          return false;
        }
        characterCardCollectionIdentifiers.push(characterCardIdentifier);
        return true;
      });
      return [...characterCardsToAdd, ...characterCardCollection];
    }
    return characterCardCollection;
  }
}

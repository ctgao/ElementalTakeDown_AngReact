import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICharacterCard, NewCharacterCard } from '../character-card.model';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';

export type PartialUpdateCharacterCard = Partial<ICharacterCard> & Pick<ICharacterCard, 'id'>;

export type EntityResponseType = HttpResponse<ICharacterCard>;
export type EntityProfileResponseType = HttpResponse<IUserProfile>;
export type EntityArrayResponseType = HttpResponse<ICharacterCard[]>;

@Injectable({ providedIn: 'root' })
export class ArchiveService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/character-cards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  update(login: string, characterCards: ICharacterCard[]): Observable<EntityProfileResponseType> {
    return this.http.put<IUserProfile>(`${this.resourceUrl}/archive/${login}`, characterCards, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICharacterCard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

// THIS IS THE MAIN GET FUNCTION
  query(login: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    if(login === ""){
      return this.http.get<ICharacterCard[]>(`${this.resourceUrl}`, { params: options, observe: 'response' });
    }
    else{
      return this.http.get<ICharacterCard[]>(`${this.resourceUrl}/archive/${login}`, { params: options, observe: 'response' });
    }
  }

  getCharacterCardIdentifier(characterCard: Pick<ICharacterCard, 'id'>): number {
    return characterCard.id;
  }
}

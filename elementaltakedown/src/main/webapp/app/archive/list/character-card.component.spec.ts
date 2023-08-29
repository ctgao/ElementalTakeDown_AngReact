import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CharacterCardService } from '../service/character-card.service';

import { CharacterCardComponent } from './character-card.component';

describe('CharacterCard Management Component', () => {
  let comp: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;
  let service: CharacterCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'character-card', component: CharacterCardComponent }]), HttpClientTestingModule],
      declarations: [CharacterCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(CharacterCardComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CharacterCardService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.characterCards?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to characterCardService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCharacterCardIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCharacterCardIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

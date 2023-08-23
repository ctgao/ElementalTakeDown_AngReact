import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UltimateATKService } from '../service/ultimate-atk.service';

import { UltimateATKComponent } from './ultimate-atk.component';

describe('UltimateATK Management Component', () => {
  let comp: UltimateATKComponent;
  let fixture: ComponentFixture<UltimateATKComponent>;
  let service: UltimateATKService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ultimate-atk', component: UltimateATKComponent }]), HttpClientTestingModule],
      declarations: [UltimateATKComponent],
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
      .overrideTemplate(UltimateATKComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UltimateATKComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UltimateATKService);

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
    expect(comp.ultimateATKS?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ultimateATKService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUltimateATKIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUltimateATKIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DamageService } from '../service/damage.service';

import { DamageComponent } from './damage.component';

describe('Damage Management Component', () => {
  let comp: DamageComponent;
  let fixture: ComponentFixture<DamageComponent>;
  let service: DamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'damage', component: DamageComponent }]), HttpClientTestingModule],
      declarations: [DamageComponent],
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
      .overrideTemplate(DamageComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DamageComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DamageService);

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
    expect(comp.damages?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to damageService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDamageIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDamageIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

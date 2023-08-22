import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BasicATKService } from '../service/basic-atk.service';

import { BasicATKComponent } from './basic-atk.component';

describe('BasicATK Management Component', () => {
  let comp: BasicATKComponent;
  let fixture: ComponentFixture<BasicATKComponent>;
  let service: BasicATKService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'basic-atk', component: BasicATKComponent }]), HttpClientTestingModule],
      declarations: [BasicATKComponent],
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
      .overrideTemplate(BasicATKComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BasicATKComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BasicATKService);

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
    expect(comp.basicATKS?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to basicATKService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBasicATKIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBasicATKIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

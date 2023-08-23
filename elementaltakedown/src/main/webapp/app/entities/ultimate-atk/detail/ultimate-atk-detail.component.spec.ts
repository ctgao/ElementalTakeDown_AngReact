import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UltimateATKDetailComponent } from './ultimate-atk-detail.component';

describe('UltimateATK Management Detail Component', () => {
  let comp: UltimateATKDetailComponent;
  let fixture: ComponentFixture<UltimateATKDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UltimateATKDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ultimateATK: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UltimateATKDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UltimateATKDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ultimateATK on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ultimateATK).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BasicATKDetailComponent } from './basic-atk-detail.component';

describe('BasicATK Management Detail Component', () => {
  let comp: BasicATKDetailComponent;
  let fixture: ComponentFixture<BasicATKDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicATKDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ basicATK: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BasicATKDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BasicATKDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load basicATK on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.basicATK).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

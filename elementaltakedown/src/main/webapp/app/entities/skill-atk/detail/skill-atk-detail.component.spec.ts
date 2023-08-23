import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SkillATKDetailComponent } from './skill-atk-detail.component';

describe('SkillATK Management Detail Component', () => {
  let comp: SkillATKDetailComponent;
  let fixture: ComponentFixture<SkillATKDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillATKDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ skillATK: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SkillATKDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SkillATKDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load skillATK on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.skillATK).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CharacterCardDetailComponent } from './character-card-detail.component';

describe('CharacterCard Management Detail Component', () => {
  let comp: CharacterCardDetailComponent;
  let fixture: ComponentFixture<CharacterCardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterCardDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ characterCard: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CharacterCardDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CharacterCardDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load characterCard on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.characterCard).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

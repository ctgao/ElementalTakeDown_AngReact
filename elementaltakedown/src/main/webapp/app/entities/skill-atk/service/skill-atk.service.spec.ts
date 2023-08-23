import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISkillATK } from '../skill-atk.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../skill-atk.test-samples';

import { SkillATKService } from './skill-atk.service';

const requireRestSample: ISkillATK = {
  ...sampleWithRequiredData,
};

describe('SkillATK Service', () => {
  let service: SkillATKService;
  let httpMock: HttpTestingController;
  let expectedResult: ISkillATK | ISkillATK[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SkillATKService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SkillATK', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const skillATK = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(skillATK).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SkillATK', () => {
      const skillATK = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(skillATK).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SkillATK', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SkillATK', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SkillATK', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSkillATKToCollectionIfMissing', () => {
      it('should add a SkillATK to an empty array', () => {
        const skillATK: ISkillATK = sampleWithRequiredData;
        expectedResult = service.addSkillATKToCollectionIfMissing([], skillATK);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(skillATK);
      });

      it('should not add a SkillATK to an array that contains it', () => {
        const skillATK: ISkillATK = sampleWithRequiredData;
        const skillATKCollection: ISkillATK[] = [
          {
            ...skillATK,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSkillATKToCollectionIfMissing(skillATKCollection, skillATK);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SkillATK to an array that doesn't contain it", () => {
        const skillATK: ISkillATK = sampleWithRequiredData;
        const skillATKCollection: ISkillATK[] = [sampleWithPartialData];
        expectedResult = service.addSkillATKToCollectionIfMissing(skillATKCollection, skillATK);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(skillATK);
      });

      it('should add only unique SkillATK to an array', () => {
        const skillATKArray: ISkillATK[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const skillATKCollection: ISkillATK[] = [sampleWithRequiredData];
        expectedResult = service.addSkillATKToCollectionIfMissing(skillATKCollection, ...skillATKArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const skillATK: ISkillATK = sampleWithRequiredData;
        const skillATK2: ISkillATK = sampleWithPartialData;
        expectedResult = service.addSkillATKToCollectionIfMissing([], skillATK, skillATK2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(skillATK);
        expect(expectedResult).toContain(skillATK2);
      });

      it('should accept null and undefined values', () => {
        const skillATK: ISkillATK = sampleWithRequiredData;
        expectedResult = service.addSkillATKToCollectionIfMissing([], null, skillATK, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(skillATK);
      });

      it('should return initial array if no SkillATK is added', () => {
        const skillATKCollection: ISkillATK[] = [sampleWithRequiredData];
        expectedResult = service.addSkillATKToCollectionIfMissing(skillATKCollection, undefined, null);
        expect(expectedResult).toEqual(skillATKCollection);
      });
    });

    describe('compareSkillATK', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSkillATK(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSkillATK(entity1, entity2);
        const compareResult2 = service.compareSkillATK(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSkillATK(entity1, entity2);
        const compareResult2 = service.compareSkillATK(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSkillATK(entity1, entity2);
        const compareResult2 = service.compareSkillATK(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

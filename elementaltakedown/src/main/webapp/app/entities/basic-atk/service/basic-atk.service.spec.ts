import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBasicATK } from '../basic-atk.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../basic-atk.test-samples';

import { BasicATKService } from './basic-atk.service';

const requireRestSample: IBasicATK = {
  ...sampleWithRequiredData,
};

describe('BasicATK Service', () => {
  let service: BasicATKService;
  let httpMock: HttpTestingController;
  let expectedResult: IBasicATK | IBasicATK[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BasicATKService);
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

    it('should create a BasicATK', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const basicATK = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(basicATK).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BasicATK', () => {
      const basicATK = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(basicATK).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BasicATK', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BasicATK', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BasicATK', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBasicATKToCollectionIfMissing', () => {
      it('should add a BasicATK to an empty array', () => {
        const basicATK: IBasicATK = sampleWithRequiredData;
        expectedResult = service.addBasicATKToCollectionIfMissing([], basicATK);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(basicATK);
      });

      it('should not add a BasicATK to an array that contains it', () => {
        const basicATK: IBasicATK = sampleWithRequiredData;
        const basicATKCollection: IBasicATK[] = [
          {
            ...basicATK,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBasicATKToCollectionIfMissing(basicATKCollection, basicATK);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BasicATK to an array that doesn't contain it", () => {
        const basicATK: IBasicATK = sampleWithRequiredData;
        const basicATKCollection: IBasicATK[] = [sampleWithPartialData];
        expectedResult = service.addBasicATKToCollectionIfMissing(basicATKCollection, basicATK);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(basicATK);
      });

      it('should add only unique BasicATK to an array', () => {
        const basicATKArray: IBasicATK[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const basicATKCollection: IBasicATK[] = [sampleWithRequiredData];
        expectedResult = service.addBasicATKToCollectionIfMissing(basicATKCollection, ...basicATKArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const basicATK: IBasicATK = sampleWithRequiredData;
        const basicATK2: IBasicATK = sampleWithPartialData;
        expectedResult = service.addBasicATKToCollectionIfMissing([], basicATK, basicATK2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(basicATK);
        expect(expectedResult).toContain(basicATK2);
      });

      it('should accept null and undefined values', () => {
        const basicATK: IBasicATK = sampleWithRequiredData;
        expectedResult = service.addBasicATKToCollectionIfMissing([], null, basicATK, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(basicATK);
      });

      it('should return initial array if no BasicATK is added', () => {
        const basicATKCollection: IBasicATK[] = [sampleWithRequiredData];
        expectedResult = service.addBasicATKToCollectionIfMissing(basicATKCollection, undefined, null);
        expect(expectedResult).toEqual(basicATKCollection);
      });
    });

    describe('compareBasicATK', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBasicATK(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBasicATK(entity1, entity2);
        const compareResult2 = service.compareBasicATK(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBasicATK(entity1, entity2);
        const compareResult2 = service.compareBasicATK(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBasicATK(entity1, entity2);
        const compareResult2 = service.compareBasicATK(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDamage } from '../damage.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../damage.test-samples';

import { DamageService } from './damage.service';

const requireRestSample: IDamage = {
  ...sampleWithRequiredData,
};

describe('Damage Service', () => {
  let service: DamageService;
  let httpMock: HttpTestingController;
  let expectedResult: IDamage | IDamage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DamageService);
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

    it('should create a Damage', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const damage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(damage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Damage', () => {
      const damage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(damage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Damage', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Damage', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Damage', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDamageToCollectionIfMissing', () => {
      it('should add a Damage to an empty array', () => {
        const damage: IDamage = sampleWithRequiredData;
        expectedResult = service.addDamageToCollectionIfMissing([], damage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(damage);
      });

      it('should not add a Damage to an array that contains it', () => {
        const damage: IDamage = sampleWithRequiredData;
        const damageCollection: IDamage[] = [
          {
            ...damage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDamageToCollectionIfMissing(damageCollection, damage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Damage to an array that doesn't contain it", () => {
        const damage: IDamage = sampleWithRequiredData;
        const damageCollection: IDamage[] = [sampleWithPartialData];
        expectedResult = service.addDamageToCollectionIfMissing(damageCollection, damage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(damage);
      });

      it('should add only unique Damage to an array', () => {
        const damageArray: IDamage[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const damageCollection: IDamage[] = [sampleWithRequiredData];
        expectedResult = service.addDamageToCollectionIfMissing(damageCollection, ...damageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const damage: IDamage = sampleWithRequiredData;
        const damage2: IDamage = sampleWithPartialData;
        expectedResult = service.addDamageToCollectionIfMissing([], damage, damage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(damage);
        expect(expectedResult).toContain(damage2);
      });

      it('should accept null and undefined values', () => {
        const damage: IDamage = sampleWithRequiredData;
        expectedResult = service.addDamageToCollectionIfMissing([], null, damage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(damage);
      });

      it('should return initial array if no Damage is added', () => {
        const damageCollection: IDamage[] = [sampleWithRequiredData];
        expectedResult = service.addDamageToCollectionIfMissing(damageCollection, undefined, null);
        expect(expectedResult).toEqual(damageCollection);
      });
    });

    describe('compareDamage', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDamage(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDamage(entity1, entity2);
        const compareResult2 = service.compareDamage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDamage(entity1, entity2);
        const compareResult2 = service.compareDamage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDamage(entity1, entity2);
        const compareResult2 = service.compareDamage(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

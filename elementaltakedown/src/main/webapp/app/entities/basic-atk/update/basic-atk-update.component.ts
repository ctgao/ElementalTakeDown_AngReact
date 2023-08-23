import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { BasicATKFormService, BasicATKFormGroup } from './basic-atk-form.service';
import { IBasicATK } from '../basic-atk.model';
import { BasicATKService } from '../service/basic-atk.service';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

@Component({
  selector: 'jhi-basic-atk-update',
  templateUrl: './basic-atk-update.component.html',
})
export class BasicATKUpdateComponent implements OnInit {
  isSaving = false;
  basicATK: IBasicATK | null = null;

  damagesSharedCollection: IDamage[] = [];

  editForm: BasicATKFormGroup = this.basicATKFormService.createBasicATKFormGroup();

  constructor(
    protected basicATKService: BasicATKService,
    protected basicATKFormService: BasicATKFormService,
    protected damageService: DamageService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDamage = (o1: IDamage | null, o2: IDamage | null): boolean => this.damageService.compareDamage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basicATK }) => {
      this.basicATK = basicATK;
      if (basicATK) {
        this.updateForm(basicATK);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basicATK = this.basicATKFormService.getBasicATK(this.editForm);
    if (basicATK.id !== null) {
      this.subscribeToSaveResponse(this.basicATKService.update(basicATK));
    } else {
      this.subscribeToSaveResponse(this.basicATKService.create(basicATK));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasicATK>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(basicATK: IBasicATK): void {
    this.basicATK = basicATK;
    this.basicATKFormService.resetForm(this.editForm, basicATK);

    this.damagesSharedCollection = this.damageService.addDamageToCollectionIfMissing<IDamage>(
      this.damagesSharedCollection,
      basicATK.damage
    );
  }

  protected loadRelationshipsOptions(): void {
    this.damageService
      .query()
      .pipe(map((res: HttpResponse<IDamage[]>) => res.body ?? []))
      .pipe(map((damages: IDamage[]) => this.damageService.addDamageToCollectionIfMissing<IDamage>(damages, this.basicATK?.damage)))
      .subscribe((damages: IDamage[]) => (this.damagesSharedCollection = damages));
  }
}

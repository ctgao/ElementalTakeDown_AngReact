import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UltimateATKFormService, UltimateATKFormGroup } from './ultimate-atk-form.service';
import { IUltimateATK } from '../ultimate-atk.model';
import { UltimateATKService } from '../service/ultimate-atk.service';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

@Component({
  selector: 'jhi-ultimate-atk-update',
  templateUrl: './ultimate-atk-update.component.html',
})
export class UltimateATKUpdateComponent implements OnInit {
  isSaving = false;
  ultimateATK: IUltimateATK | null = null;

  damagesSharedCollection: IDamage[] = [];

  editForm: UltimateATKFormGroup = this.ultimateATKFormService.createUltimateATKFormGroup();

  constructor(
    protected ultimateATKService: UltimateATKService,
    protected ultimateATKFormService: UltimateATKFormService,
    protected damageService: DamageService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDamage = (o1: IDamage | null, o2: IDamage | null): boolean => this.damageService.compareDamage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ultimateATK }) => {
      this.ultimateATK = ultimateATK;
      if (ultimateATK) {
        this.updateForm(ultimateATK);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ultimateATK = this.ultimateATKFormService.getUltimateATK(this.editForm);
    if (ultimateATK.id !== null) {
      this.subscribeToSaveResponse(this.ultimateATKService.update(ultimateATK));
    } else {
      this.subscribeToSaveResponse(this.ultimateATKService.create(ultimateATK));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUltimateATK>>): void {
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

  protected updateForm(ultimateATK: IUltimateATK): void {
    this.ultimateATK = ultimateATK;
    this.ultimateATKFormService.resetForm(this.editForm, ultimateATK);

    this.damagesSharedCollection = this.damageService.addDamageToCollectionIfMissing<IDamage>(
      this.damagesSharedCollection,
      ultimateATK.damage
    );
  }

  protected loadRelationshipsOptions(): void {
    this.damageService
      .query()
      .pipe(map((res: HttpResponse<IDamage[]>) => res.body ?? []))
      .pipe(map((damages: IDamage[]) => this.damageService.addDamageToCollectionIfMissing<IDamage>(damages, this.ultimateATK?.damage)))
      .subscribe((damages: IDamage[]) => (this.damagesSharedCollection = damages));
  }
}

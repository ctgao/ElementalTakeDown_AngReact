import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DamageFormService, DamageFormGroup } from './damage-form.service';
import { IDamage } from '../damage.model';
import { DamageService } from '../service/damage.service';
import { DmgElementType } from 'app/entities/enumerations/dmg-element-type.model';

@Component({
  selector: 'jhi-damage-update',
  templateUrl: './damage-update.component.html',
})
export class DamageUpdateComponent implements OnInit {
  isSaving = false;
  damage: IDamage | null = null;
  dmgElementTypeValues = Object.keys(DmgElementType);

  editForm: DamageFormGroup = this.damageFormService.createDamageFormGroup();

  constructor(
    protected damageService: DamageService,
    protected damageFormService: DamageFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ damage }) => {
      this.damage = damage;
      if (damage) {
        this.updateForm(damage);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const damage = this.damageFormService.getDamage(this.editForm);
    if (damage.id !== null) {
      this.subscribeToSaveResponse(this.damageService.update(damage));
    } else {
      this.subscribeToSaveResponse(this.damageService.create(damage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDamage>>): void {
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

  protected updateForm(damage: IDamage): void {
    this.damage = damage;
    this.damageFormService.resetForm(this.editForm, damage);
  }
}

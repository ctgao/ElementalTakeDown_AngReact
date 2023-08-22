import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SkillATKFormService, SkillATKFormGroup } from './skill-atk-form.service';
import { ISkillATK } from '../skill-atk.model';
import { SkillATKService } from '../service/skill-atk.service';
import { IDamage } from 'app/entities/damage/damage.model';
import { DamageService } from 'app/entities/damage/service/damage.service';

@Component({
  selector: 'jhi-skill-atk-update',
  templateUrl: './skill-atk-update.component.html',
})
export class SkillATKUpdateComponent implements OnInit {
  isSaving = false;
  skillATK: ISkillATK | null = null;

  damagesSharedCollection: IDamage[] = [];

  editForm: SkillATKFormGroup = this.skillATKFormService.createSkillATKFormGroup();

  constructor(
    protected skillATKService: SkillATKService,
    protected skillATKFormService: SkillATKFormService,
    protected damageService: DamageService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDamage = (o1: IDamage | null, o2: IDamage | null): boolean => this.damageService.compareDamage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillATK }) => {
      this.skillATK = skillATK;
      if (skillATK) {
        this.updateForm(skillATK);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skillATK = this.skillATKFormService.getSkillATK(this.editForm);
    if (skillATK.id !== null) {
      this.subscribeToSaveResponse(this.skillATKService.update(skillATK));
    } else {
      this.subscribeToSaveResponse(this.skillATKService.create(skillATK));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkillATK>>): void {
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

  protected updateForm(skillATK: ISkillATK): void {
    this.skillATK = skillATK;
    this.skillATKFormService.resetForm(this.editForm, skillATK);

    this.damagesSharedCollection = this.damageService.addDamageToCollectionIfMissing<IDamage>(
      this.damagesSharedCollection,
      skillATK.damage
    );
  }

  protected loadRelationshipsOptions(): void {
    this.damageService
      .query()
      .pipe(map((res: HttpResponse<IDamage[]>) => res.body ?? []))
      .pipe(map((damages: IDamage[]) => this.damageService.addDamageToCollectionIfMissing<IDamage>(damages, this.skillATK?.damage)))
      .subscribe((damages: IDamage[]) => (this.damagesSharedCollection = damages));
  }
}

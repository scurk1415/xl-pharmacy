import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '@xl/shared/features/modal/modal-container/modal-container.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LabelFieldComponent } from '@xl/shared/components/label-field/label-field.component';
import { ReplacementFilterComponent } from '../replacement-filter/replacement-filter.component';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { AsyncPipe, JsonPipe, DecimalPipe } from '@angular/common';
import { SuggestedReplacementsComponent } from '../suggested-replacements/suggested-replacements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHelper } from '../../helpers/form-helper';
import { ApiPrescriptionResponse } from '@xl/api';
import { SuggestedReplacement } from '../../models/suggested-replacement';
import { SelectedReplacementsComponent } from '../selected-replacements/selected-replacements.component';
import { Observable, startWith, switchMap, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuggestionFilter } from '../../models/suggestion-filter';

@Component({
  selector: 'xl-create-replacement',
  standalone: true,
  imports: [
    ModalContainerComponent,
    LabelFieldComponent,
    ReplacementFilterComponent,
    AsyncPipe,
    SuggestedReplacementsComponent,
    ReactiveFormsModule,
    JsonPipe,
    SelectedReplacementsComponent,
    DecimalPipe
  ],
  templateUrl: './create-replacement.component.html',
  styleUrl: './create-replacement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReplacementComponent {

  private prescriptionsService = inject(PrescriptionsService);
  protected data = inject<ApiPrescriptionResponse>(DIALOG_DATA);

  protected form = FormHelper.createForm();

  protected itemOptions = this.prescriptionsService.getItemOptions(this.data.prescriptionId);
  protected currentTotalValue$: Observable<number> = this.calculateTotalValue();
  protected filteredData = toSignal(this.listenToFilterChanges(), { initialValue: [] });

  createReplacement() {
    if (this.form.invalid) {
      return;
    }

    this.prescriptionsService.creteReplacement(this.form.getRawValue());
  }

  resetReplacements() {
    this.form.controls.alternatives.clear();
  }

  addReplacement(item: SuggestedReplacement) {
    this.form.controls.alternatives.push(
      FormHelper.createAlternativeGroup(item)
    );
  }

  private calculateTotalValue() {
    return this.form.controls.alternatives.valueChanges
      .pipe(
        map((alternatives) => alternatives.reduce((acc, curr) => acc + (curr.price! * curr.quantity!), 0)),
        startWith(0)
      );
  }

  private listenToFilterChanges() {
    return combineLatest([
        this.form.controls.codes.valueChanges.pipe(startWith(this.form.controls.codes.value)),
        this.form.controls.search.valueChanges.pipe(startWith(this.form.controls.search.value)),
        this.form.controls.onlyAvailable.valueChanges.pipe(startWith(this.form.controls.onlyAvailable.value))
      ])
        .pipe(
          map(([codes, search, onlyAvailable]) => ({ codes: codes!, search: search!, onlyAvailable: onlyAvailable! })),
          switchMap((filtered: SuggestionFilter) => this.prescriptionsService.getSuggestions(filtered))
        );
  }

}

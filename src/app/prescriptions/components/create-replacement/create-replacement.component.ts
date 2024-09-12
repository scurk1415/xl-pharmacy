import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '@xl/shared/features/modal/modal-container/modal-container.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { LabelFieldComponent } from '@xl/shared/components/label-field/label-field.component';
import { ReplacementFilterComponent } from '../replacement-filter/replacement-filter.component';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SuggestedReplacementsComponent } from '../suggested-replacements/suggested-replacements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHelper } from '../../helpers/form-helper';
import { ApiPrescriptionResponse } from '@xl/api';
import { SuggestedReplacement } from '../../models/suggested-replacement';
import { SelectedReplacementsComponent } from '../selected-replacements/selected-replacements.component';

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
    SelectedReplacementsComponent
  ],
  templateUrl: './create-replacement.component.html',
  styleUrl: './create-replacement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReplacementComponent {

  private prescriptionsService = inject(PrescriptionsService);
  private dialogRef = inject(DialogRef<ApiPrescriptionResponse>);
  protected data = inject<ApiPrescriptionResponse>(DIALOG_DATA);

  protected form = FormHelper.createForm()

  itemOptions = this.prescriptionsService.getItemOptions(this.data.prescriptionId);

  createReplacement() {

    if (this.form.invalid) {
      return;
    }

    this.prescriptionsService.creteReplacement(this.form.getRawValue());
  }

  closeModal() {
    this.dialogRef.close();
  }

  addReplacement(item: SuggestedReplacement) {
    this.form.controls.alternatives.push(
      FormHelper.createAlternativeGroup(item)
    );
  }
}

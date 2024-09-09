import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '@xl/shared/features/modal/modal-container/modal-container.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LabelFieldComponent } from '@xl/shared/components/label-field/label-field.component';
import { ReplacementFilterComponent } from '../replacement-filter/replacement-filter.component';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { ApiPrescriptionResponse } from '@xl/api';
import { AsyncPipe } from '@angular/common';
import { SuggestedReplacementsComponent } from '../suggested-replacements/suggested-replacements.component';

@Component({
  selector: 'xl-edit-prescription',
  standalone: true,
  imports: [
    ModalContainerComponent,
    LabelFieldComponent,
    ReplacementFilterComponent,
    AsyncPipe,
    SuggestedReplacementsComponent
  ],
  templateUrl: './edit-prescription.component.html',
  styleUrl: './edit-prescription.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrescriptionComponent {

  private prescriptionsService = inject(PrescriptionsService);
  protected data = inject<ApiPrescriptionResponse>(DIALOG_DATA);

  itemOptions = this.prescriptionsService.getItemOptions(this.data.prescriptionId);

}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { DecimalPipe } from '@angular/common';
import { TableModule } from '@xl/shared/features/table/table.module';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';
import { ModalService } from '@xl/shared/features/modal/modal.service';
import { ApiPrescriptionResponse } from '@xl/api';
import { CreateReplacementComponent } from '../../components/create-replacement/create-replacement.component';

@Component({
  selector: 'xl-order-management',
  standalone: true,
  imports: [
    TableModule,
    DecimalPipe
  ],
  templateUrl: './prescription-management.component.html',
  styleUrl: './prescription-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PrescriptionManagementComponent extends TableBase<ApiPrescriptionResponse> {

  private prescriptionsService = inject(PrescriptionsService);
  private modalService = inject(ModalService);

  override data = this.prescriptionsService.getPrescriptions();

  override getColumns() {
    return [
      { label: 'Id' },
      { label: 'Product' },
      { label: 'Created' },
      { label: 'Amount' },
      { label: 'Customer' },
      { label: '' }
    ];
  }

  openEditModal(item: ApiPrescriptionResponse) {
    this.modalService.open(CreateReplacementComponent, item, { width: '95%'}).subscribe(console.log)
  }

}

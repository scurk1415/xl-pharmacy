import { Injectable, inject } from '@angular/core';
import { toListSignal } from '@xl/shared/helpers/signal-helper';
import { catchError, of } from 'rxjs';
import { PrescriptionsApiService, ApiPrescriptionResponse, ApiPrescriptionReplacementResponse } from '@xl/api';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  private prescriptionsApiService = inject(PrescriptionsApiService);

  getPrescriptions() {
    return toListSignal(this.prescriptionsApiService.getPrescriptionList({ filter: {} })
      .pipe(
        catchError(() => of(prescriptions))
      ));
  }

  getItemOptions(prescriptionId: number) {
    return this.prescriptionsApiService.getFilters({ prescriptionId: prescriptionId })
      .pipe(
        catchError(() => of(filters))
      );
  }

  creteReplacement(replacement: any) {
    this.prescriptionsApiService.createReplacement({ body: replacement });
  }
}

const prescriptions: ApiPrescriptionResponse[] = [
  {
    prescriptionId: 1,
    prescriptionName: 'First Order',
    prescriptionDate: new Date().valueOf(),
    totalAmount: 15,
    customer: { name: 'John Doe', customerId: 1 }
  }
];

const filters: ApiPrescriptionReplacementResponse[] = [
  {
    name: 'MZZ',
    description: 'atorvastatin 10mg, filmsko ovlozena tableta',
    value: 'MZZ'
  },
  {
    name: 'TSZ',
    description: 'Zdravila za znizevanje holesterola',
    value: 'TSZ'
  },
  {
    name: 'ATC',
    value: 'ATC',
    children: [
      {
        name: 'C10AA05',
        description: 'Atorvastatin',
        value: 'C10AA05'
      },
      {
        name: 'C10AA',
        description: 'Zaviralci reduktaze HMG CoA',
        value: 'C10AA'
      },
      {
        name: 'C10A',
        description: 'Zdravila za spreminjanje ravni serumkius lipidov, enokomponentna zdravila',
        value: 'C10A'
      },
      {
        name: 'C10',
        description: 'Zdravila za spreminjanje ravni serumkius lipidov',
        value: 'C10'
      },
      {
        name: 'C',
        description: 'Zdravila za bolezni srca in ožilja',
        value: 'C'
      }
    ]
  }
];

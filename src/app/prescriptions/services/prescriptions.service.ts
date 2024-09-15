import { Injectable, inject } from '@angular/core';
import { toListSignal } from '@xl/shared/helpers/signal-helper';
import { catchError, of, Observable } from 'rxjs';
import { PrescriptionsApiService, ApiPrescriptionResponse } from '@xl/api';
import { SuggestedReplacement } from '../models/suggested-replacement';
import { SuggestionFilter } from '../models/suggestion-filter';
import { map } from 'rxjs/operators';
import { PrescriptionReplacementOption } from '../models/prescription-replacement-option';

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

  getItemOptions(prescriptionId: number): Observable<any[]> {
    return this.prescriptionsApiService.getFilters({ prescriptionId: prescriptionId })
      .pipe(
        catchError(() => of(filters))
      );
  }

  creteReplacement(replacement: any) {
    this.prescriptionsApiService.createReplacement({ body: replacement });
  }

  getSuggestions(filter: SuggestionFilter) {
    if (filter.codes.length === 0) {
      return of([]);
    }

    return of<SuggestedReplacement[]>([
      {
        id: 1,
        label: 'Atoris 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 8,
        code: 'MZZ'
      },
      {
        id: 2,
        label: 'Sortis 10 mg film.obl.tbl. 30x',
        price: 2.67,
        stockNumber: 2,
        code: 'TSZ'
      },
      {
        id: 3,
        label: 'Atoris 10 mg film.obl.tbl. 90x',
        price: 2.12,
        stockNumber: 15,
        code: 'ATC'
      },
      {
        id: 4,
        label: 'Stavra 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 0,
        code: 'C10AA05'
      },
      {
        id: 5,
        label: 'Tulip 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 7,
        code: 'C10AA'
      }
    ])
      .pipe(
        map((items) => {
          return items.filter(it => {
            if (filter.onlyAvailable && it.stockNumber <= 0) {
              return false;
            }

            if (filter.search && !it.label.includes(filter.search)) {
              return false;
            }

            return !(filter.codes?.length > 0 && !filter.codes.includes(it.code));
          });
        })
      );
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

const filters: PrescriptionReplacementOption[] = [
  {
    name: 'MZZ',
    description: 'atorvastatin 10mg, filmsko ovlozena tableta',
    value: 'MZZ',
    selected: false
  },
  {
    name: 'TSZ',
    description: 'Zdravila za znizevanje holesterola',
    value: 'TSZ',
    selected: false
  },
  {
    name: 'ATC',
    value: 'ATC',
    selected: false,
    children: [
      {
        name: 'C10AA05',
        description: 'Atorvastatin',
        value: 'C10AA05',
        selected: false
      },
      {
        name: 'C10AA',
        description: 'Zaviralci reduktaze HMG CoA',
        value: 'C10AA',
        selected: false
      },
      {
        name: 'C10A',
        description: 'Zdravila za spreminjanje ravni serumkius lipidov, enokomponentna zdravila',
        value: 'C10A',
        selected: false
      },
      {
        name: 'C10',
        description: 'Zdravila za spreminjanje ravni serumkius lipidov',
        value: 'C10',
        selected: false
      },
      {
        name: 'C',
        description: 'Zdravila za bolezni srca in ožilja',
        value: 'C',
        selected: false
      }
    ]
  }
];

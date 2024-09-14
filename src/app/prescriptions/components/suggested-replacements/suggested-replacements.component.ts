import { ChangeDetectionStrategy, Component, Signal, signal, output, input, computed } from '@angular/core';
import { TableColumn } from '@xl/shared/features/table/table.component';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';
import { DecimalPipe } from '@angular/common';
import { TableModule } from '@xl/shared/features/table/table.module';
import { StockBadgeComponent } from '../stock-badge/stock-badge.component';
import { SuggestedReplacement } from '../../models/suggested-replacement';


@Component({
  selector: 'xl-suggested-replacements',
  standalone: true,
  imports: [
    TableModule,
    DecimalPipe,
    StockBadgeComponent
  ],
  templateUrl: './suggested-replacements.component.html',
  styleUrl: './suggested-replacements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedReplacementsComponent extends TableBase<SuggestedReplacement> {

  alternatives = input.required<any[]>();

  selectedItems = computed(() => this.alternatives().map((item: any) => item.id));

  addReplacement = output<SuggestedReplacement>()

  override data = this.prepareData();

  override getColumns(): TableColumn[] {
    return [
      { label: 'Naziv Izdelka' },
      { label: 'Doplacilo', style: { width: '100px', textAlign: 'right' } },
      { label: '', style: { width: '50px' } }
    ];
  }

  private prepareData(): Signal<SuggestedReplacement[]> {
    return signal([
      {
        id: 1,
        label: 'Atoris 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 8
      },
      {
        id: 2,
        label: 'Sortis 10 mg film.obl.tbl. 30x',
        price: 2.67,
        stockNumber: 2
      },
      {
        id: 3,
        label: 'Atoris 10 mg film.obl.tbl. 90x',
        price: 2.12,
        stockNumber: 15
      },
      {
        id: 4,
        label: 'Stavra 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 0
      },
      {
        id: 5,
        label: 'Tulip 10 mg film.obl.tbl. 30x',
        price: 1.59,
        stockNumber: 7
      }
    ])
  }

  onAddReplacement(item: SuggestedReplacement) {
    this.addReplacement.emit(item);
  }
}

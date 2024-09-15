import { ChangeDetectionStrategy, Component, output, input, computed } from '@angular/core';
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

  override data = input.required<SuggestedReplacement[]>();

  override getColumns(): TableColumn[] {
    return [
      { label: 'Naziv Izdelka' },
      { label: 'Doplacilo', style: { width: '100px', textAlign: 'right' } },
      { label: '', style: { width: '50px' } }
    ];
  }

  onAddReplacement(item: SuggestedReplacement) {
    this.addReplacement.emit(item);
  }
}

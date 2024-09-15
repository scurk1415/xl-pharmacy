import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { StockBadgeComponent } from '../stock-badge/stock-badge.component';
import { TableColumn } from '@xl/shared/features/table/table.component';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';
import { SuggestedReplacement } from '../../models/suggested-replacement';
import { TableModule } from '@xl/shared/features/table/table.module';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AlternativeGroup } from '../../helpers/form-helper';

@Component({
  selector: 'xl-selected-replacements',
  standalone: true,
  imports: [
    StockBadgeComponent,
    TableModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './selected-replacements.component.html',
  styleUrl: './selected-replacements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedReplacementsComponent extends TableBase<SuggestedReplacement>  {

  formArray = input.required<FormArray<FormGroup<AlternativeGroup>>>()

  alternatives = input.required<any[]>();

  override data = computed(() => this.alternatives());

  override getColumns(): TableColumn[] {
    return [
      { label: 'Naziv Izdelka' },
      { label: 'Doplacilo', style: { width: '100px', textAlign: 'right' } },
      { label: '', style: { width: '50px' } }
    ];
  }

  onRemoveReplacement(index: number) {
    this.formArray().removeAt(index);
  }

  get alternativesFormControls() {
    return this.formArray().controls;
  }

}

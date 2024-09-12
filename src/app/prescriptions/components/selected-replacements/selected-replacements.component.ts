import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { StockBadgeComponent } from '../stock-badge/stock-badge.component';
import { TableColumn } from '@xl/shared/features/table/table.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';
import { SuggestedReplacement } from '../../models/suggested-replacement';
import { TableModule } from '@xl/shared/features/table/table.module';

@Component({
  selector: 'xl-selected-replacements',
  standalone: true,
  imports: [
    StockBadgeComponent,
    TableModule
  ],
  templateUrl: './selected-replacements.component.html',
  styleUrl: './selected-replacements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectedReplacementsComponent),
      multi: true
    }
  ]
})
export class SelectedReplacementsComponent extends TableBase<SuggestedReplacement> implements ControlValueAccessor {

  private onChange: (value: any[]) => void = (value) => {};
  private onTouched: () => void = () => {};

  value = signal<any>([]);

  override data = this.value();

  override getColumns(): TableColumn[] {
    return [
      { label: 'Naziv Izdelka' },
      { label: 'Doplacilo', style: { width: '100px', textAlign: 'right' } },
      { label: '', style: { width: '50px' } }
    ];
  }

  writeValue(value: any): void {
    console.log(value);
    this.value.set(value);
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

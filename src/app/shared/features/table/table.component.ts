import { ChangeDetectionStrategy, Component, input, contentChild } from '@angular/core';
import { NgTemplateOutlet, NgClass, NgStyle } from '@angular/common';
import { TableRowDirective } from '@xl/shared/features/table/table-row.directive';

@Component({
  selector: 'xl-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass,
    NgStyle
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {

  columns = input.required<TableColumn[]>();
  data = input.required<T[]>();
  simple = input<boolean>(false);

  rowTemplate = contentChild.required(TableRowDirective);

}

export interface TableColumn {
  label: string;
  style?: Record<string, any>;
}

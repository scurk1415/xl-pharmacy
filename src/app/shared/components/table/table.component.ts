import { ChangeDetectionStrategy, Component, input, contentChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableRowDirective } from '@xl/shared/components/table/table-row.directive';

@Component({
  selector: 'xl-table',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {

  columns = input.required<TableColumn[]>();
  data = input.required<T[]>();

  rowTemplate = contentChild.required(TableRowDirective);

}

export interface TableColumn {
  label: string;
}

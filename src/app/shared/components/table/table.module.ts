import { NgModule } from '@angular/core';
import { TableComponent } from '@xl/shared/components/table/table.component';
import { TableRowDirective } from '@xl/shared/components/table/table-row.directive';

@NgModule({
  imports: [
    TableComponent,
    TableRowDirective
  ],
  exports: [
    TableComponent,
    TableRowDirective
  ]
})
export class TableModule { }

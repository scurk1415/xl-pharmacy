import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { TableRowDirective } from './table-row.directive';

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

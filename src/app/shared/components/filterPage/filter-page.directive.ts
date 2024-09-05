import { Directive, signal, Signal } from '@angular/core';
import { TableColumn } from '@xl/shared/components/table/table.component';

@Directive()
export abstract class FilterPageDirective<T> {

  protected columns = signal(this.getColumns());

  abstract data: Signal<T[]>;
  abstract getColumns(): TableColumn[];

}

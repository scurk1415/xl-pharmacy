import { Directive, signal, Signal } from '@angular/core';
import { TableColumn } from '@xl/shared/features/table/table.component';

@Directive()
export abstract class TableBase<T> {

  protected columns = signal(this.getColumns());

  abstract data: Signal<T[]>;
  abstract getColumns(): TableColumn[];

}

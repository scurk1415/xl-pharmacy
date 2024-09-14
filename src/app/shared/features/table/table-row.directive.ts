import { Directive, inject, TemplateRef, input } from '@angular/core';

@Directive({
  selector: '[xlTableRow]',
  standalone: true,
})
export class TableRowDirective<Item> {

  template = inject(TemplateRef);

  data = input.required<Item[]>({ alias: 'xlTableRow' });

  static ngTemplateContextGuard<T>(dir: TableRowDirective<T>, ctx: TableRowContext<T>): ctx is TableRowContext<T> {
    return true;
  }

}

interface TableRowContext<T> {
  $implicit: T;
  index: number;
}

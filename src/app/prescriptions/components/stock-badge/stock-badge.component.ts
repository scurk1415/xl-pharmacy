import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  selector: 'xl-stock-badge',
  standalone: true,
  imports: [],
  templateUrl: './stock-badge.component.html',
  styleUrl: './stock-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.in-stock]': 'isInStock()',
  }
})
export class StockBadgeComponent {

  stock = input.required<number>();

  protected isInStock = computed(() => this.stock() > 0);

}

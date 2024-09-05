import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterPageDirective } from '@xl/shared/components/filterPage/filter-page.directive';
import { ApiOrderResponse } from '@xl/api';
import { OrdersService } from '../../services/orders.service';
import { TableModule } from '@xl/shared/components/table/table.module';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'xl-order-management',
  standalone: true,
  imports: [
    TableModule,
    DecimalPipe
  ],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrderManagementComponent extends FilterPageDirective<ApiOrderResponse> {

  private ordersService = inject(OrdersService);

  data = this.ordersService.getOrders();

  getColumns() {
    return [
      { label: 'Id' },
      { label: 'Product' },
      { label: 'Created' },
      { label: 'Amount' },
      { label: 'Customer' }
    ];
  }

}

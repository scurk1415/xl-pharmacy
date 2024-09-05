import { Injectable, inject } from '@angular/core';
import { OrdersApiService, ApiOrderResponse } from '@xl/api';
import { toListSignal } from '@xl/shared/helpers/signal-helper';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersApiService = inject(OrdersApiService);

  getOrders() {
    return toListSignal(this.ordersApiService.getOrderList()
      .pipe(
        catchError(() => of(orders))
      ));
  }

}

const orders: ApiOrderResponse[] = [
  { orderId: 1, orderName: 'First Order', orderDate: new Date().valueOf(), totalAmount: 15, customer: { name: 'John Doe', customerId: 1 } }
];

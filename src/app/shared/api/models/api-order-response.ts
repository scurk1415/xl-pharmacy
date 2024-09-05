/* tslint:disable */
/* eslint-disable */
import { ApiCustomer } from '../models/api-customer';
export interface ApiOrderResponse {
  customer?: ApiCustomer;
  orderDate?: number;
  orderId?: number;
  orderName?: string;
  totalAmount?: number;
}

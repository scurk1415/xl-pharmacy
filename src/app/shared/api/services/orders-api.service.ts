/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getOrderList, GetOrderList$Params } from '../fn/orders/get-order-list';
import { ApiOrderResponse } from '../models/api-order-response';

@Injectable({ providedIn: 'root' })
export class OrdersApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOrderList()` */
  static readonly GetOrderListPath = '/orders';

  /**
   * Get order list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderList()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getOrderList$Response(params?: GetOrderList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiOrderResponse>>> {
    return getOrderList(this.http, this.rootUrl, params, context);
  }

  /**
   * Get order list.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderList$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getOrderList(params?: GetOrderList$Params, context?: HttpContext): Observable<Array<ApiOrderResponse>> {
    return this.getOrderList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApiOrderResponse>>): Array<ApiOrderResponse> => r.body)
    );
  }

}

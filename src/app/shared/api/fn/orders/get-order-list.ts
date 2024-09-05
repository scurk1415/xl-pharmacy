/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiOrderRequest } from '../../models/api-order-request';
import { ApiOrderResponse } from '../../models/api-order-response';

export interface GetOrderList$Params {
  
    /**
     * Filter Orders
     */
    body?: ApiOrderRequest
}

export function getOrderList(http: HttpClient, rootUrl: string, params?: GetOrderList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiOrderResponse>>> {
  const rb = new RequestBuilder(rootUrl, getOrderList.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApiOrderResponse>>;
    })
  );
}

getOrderList.PATH = '/orders';

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Order } from '../../models/order';

export interface PlaceOrder$Xml$Params {
      body?: Order
}

export function placeOrder$Xml(http: HttpClient, rootUrl: string, params?: PlaceOrder$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
  const rb = new RequestBuilder(rootUrl, placeOrder$Xml.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/xml');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Order>;
    })
  );
}

placeOrder$Xml.PATH = '/store/order';

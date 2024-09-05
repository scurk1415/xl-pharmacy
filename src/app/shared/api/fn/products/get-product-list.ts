/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiProductRequest } from '../../models/api-product-request';
import { ApiProductResponse } from '../../models/api-product-response';

export interface GetProductList$Params {
  
    /**
     * Filter Products
     */
    body?: ApiProductRequest
}

export function getProductList(http: HttpClient, rootUrl: string, params?: GetProductList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiProductResponse>>> {
  const rb = new RequestBuilder(rootUrl, getProductList.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApiProductResponse>>;
    })
  );
}

getProductList.PATH = '/products';

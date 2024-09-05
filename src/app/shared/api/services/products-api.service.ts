/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getProductList, GetProductList$Params } from '../fn/products/get-product-list';
import { ApiProductResponse } from '../models/api-product-response';

@Injectable({ providedIn: 'root' })
export class ProductsApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProductList()` */
  static readonly GetProductListPath = '/products';

  /**
   * Get product list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductList()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getProductList$Response(params?: GetProductList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiProductResponse>>> {
    return getProductList(this.http, this.rootUrl, params, context);
  }

  /**
   * Get product list.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductList$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getProductList(params?: GetProductList$Params, context?: HttpContext): Observable<Array<ApiProductResponse>> {
    return this.getProductList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApiProductResponse>>): Array<ApiProductResponse> => r.body)
    );
  }

}

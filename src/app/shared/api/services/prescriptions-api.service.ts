/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createReplacement, CreateReplacement$Params } from '../fn/prescriptions/create-replacement';
import { getFilters, GetFilters$Params } from '../fn/prescriptions/get-filters';
import { getPrescriptionList, GetPrescriptionList$Params } from '../fn/prescriptions/get-prescription-list';
import { ApiPrescriptionReplacementResponse } from '../models/api-prescription-replacement-response';
import { ApiPrescriptionResponse } from '../models/api-prescription-response';

@Injectable({ providedIn: 'root' })
export class PrescriptionsApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPrescriptionList()` */
  static readonly GetPrescriptionListPath = '/prescriptions';

  /**
   * Get prescription list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPrescriptionList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrescriptionList$Response(params: GetPrescriptionList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiPrescriptionResponse>>> {
    return getPrescriptionList(this.http, this.rootUrl, params, context);
  }

  /**
   * Get prescription list.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPrescriptionList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrescriptionList(params: GetPrescriptionList$Params, context?: HttpContext): Observable<Array<ApiPrescriptionResponse>> {
    return this.getPrescriptionList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApiPrescriptionResponse>>): Array<ApiPrescriptionResponse> => r.body)
    );
  }

  /** Path part for operation `createReplacement()` */
  static readonly CreateReplacementPath = '/prescriptions';

  /**
   * Create prescription replacement.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReplacement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReplacement$Response(params?: CreateReplacement$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createReplacement(this.http, this.rootUrl, params, context);
  }

  /**
   * Create prescription replacement.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReplacement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReplacement(params?: CreateReplacement$Params, context?: HttpContext): Observable<void> {
    return this.createReplacement$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getFilters()` */
  static readonly GetFiltersPath = '/prescriptions/{prescriptionId}';

  /**
   * Get available filters for prescription.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilters$Response(params: GetFilters$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiPrescriptionReplacementResponse>>> {
    return getFilters(this.http, this.rootUrl, params, context);
  }

  /**
   * Get available filters for prescription.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilters(params: GetFilters$Params, context?: HttpContext): Observable<Array<ApiPrescriptionReplacementResponse>> {
    return this.getFilters$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApiPrescriptionReplacementResponse>>): Array<ApiPrescriptionReplacementResponse> => r.body)
    );
  }

}

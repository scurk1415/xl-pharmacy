/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiPrescriptionReplacementResponse } from '../../models/api-prescription-replacement-response';

export interface GetFilters$Params {

/**
 * Prescription ID
 */
  prescriptionId: number;
}

export function getFilters(http: HttpClient, rootUrl: string, params: GetFilters$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiPrescriptionReplacementResponse>>> {
  const rb = new RequestBuilder(rootUrl, getFilters.PATH, 'get');
  if (params) {
    rb.path('prescriptionId', params.prescriptionId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApiPrescriptionReplacementResponse>>;
    })
  );
}

getFilters.PATH = '/prescriptions/{prescriptionId}';

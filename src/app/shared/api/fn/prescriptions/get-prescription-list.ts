/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiPrescriptionRequest } from '../../models/api-prescription-request';
import { ApiPrescriptionResponse } from '../../models/api-prescription-response';

export interface GetPrescriptionList$Params {

/**
 * Filter Prescriptions
 */
  filter: ApiPrescriptionRequest;
}

export function getPrescriptionList(http: HttpClient, rootUrl: string, params: GetPrescriptionList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiPrescriptionResponse>>> {
  const rb = new RequestBuilder(rootUrl, getPrescriptionList.PATH, 'get');
  if (params) {
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApiPrescriptionResponse>>;
    })
  );
}

getPrescriptionList.PATH = '/prescriptions';

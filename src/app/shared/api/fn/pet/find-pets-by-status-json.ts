/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface FindPetsByStatus$Json$Params {

/**
 * Status values that need to be considered for filter
 */
  status?: 'available' | 'pending' | 'sold';
}

export function findPetsByStatus$Json(http: HttpClient, rootUrl: string, params?: FindPetsByStatus$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pet>>> {
  const rb = new RequestBuilder(rootUrl, findPetsByStatus$Json.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {"explode":true});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Pet>>;
    })
  );
}

findPetsByStatus$Json.PATH = '/pet/findByStatus';

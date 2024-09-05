/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface FindPetsByStatus$Xml$Params {

/**
 * Status values that need to be considered for filter
 */
  status?: 'available' | 'pending' | 'sold';
}

export function findPetsByStatus$Xml(http: HttpClient, rootUrl: string, params?: FindPetsByStatus$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pet>>> {
  const rb = new RequestBuilder(rootUrl, findPetsByStatus$Xml.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {"explode":true});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Pet>>;
    })
  );
}

findPetsByStatus$Xml.PATH = '/pet/findByStatus';

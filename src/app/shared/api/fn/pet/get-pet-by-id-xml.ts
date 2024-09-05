/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface GetPetById$Xml$Params {

/**
 * ID of pet to return
 */
  petId: number;
}

export function getPetById$Xml(http: HttpClient, rootUrl: string, params: GetPetById$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, getPetById$Xml.PATH, 'get');
  if (params) {
    rb.path('petId', params.petId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Pet>;
    })
  );
}

getPetById$Xml.PATH = '/pet/{petId}';

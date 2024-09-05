/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface GetPetById$Json$Params {

/**
 * ID of pet to return
 */
  petId: number;
}

export function getPetById$Json(http: HttpClient, rootUrl: string, params: GetPetById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, getPetById$Json.PATH, 'get');
  if (params) {
    rb.path('petId', params.petId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Pet>;
    })
  );
}

getPetById$Json.PATH = '/pet/{petId}';

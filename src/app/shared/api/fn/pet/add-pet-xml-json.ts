/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface AddPet$Xml$Json$Params {
  
    /**
     * Create a new pet in the store
     */
    body: Pet
}

export function addPet$Xml$Json(http: HttpClient, rootUrl: string, params: AddPet$Xml$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, addPet$Xml$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/xml');
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

addPet$Xml$Json.PATH = '/pet';

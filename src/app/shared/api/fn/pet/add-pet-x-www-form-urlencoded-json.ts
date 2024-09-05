/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface AddPet$XWwwFormUrlencoded$Json$Params {
  
    /**
     * Create a new pet in the store
     */
    body: Pet
}

export function addPet$XWwwFormUrlencoded$Json(http: HttpClient, rootUrl: string, params: AddPet$XWwwFormUrlencoded$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, addPet$XWwwFormUrlencoded$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/x-www-form-urlencoded');
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

addPet$XWwwFormUrlencoded$Json.PATH = '/pet';

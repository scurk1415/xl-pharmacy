/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface UpdatePet$XWwwFormUrlencoded$Json$Params {
  
    /**
     * Update an existent pet in the store
     */
    body: Pet
}

export function updatePet$XWwwFormUrlencoded$Json(http: HttpClient, rootUrl: string, params: UpdatePet$XWwwFormUrlencoded$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, updatePet$XWwwFormUrlencoded$Json.PATH, 'put');
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

updatePet$XWwwFormUrlencoded$Json.PATH = '/pet';

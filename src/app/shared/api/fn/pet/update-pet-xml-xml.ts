/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface UpdatePet$Xml$Xml$Params {
  
    /**
     * Update an existent pet in the store
     */
    body: Pet
}

export function updatePet$Xml$Xml(http: HttpClient, rootUrl: string, params: UpdatePet$Xml$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Pet>> {
  const rb = new RequestBuilder(rootUrl, updatePet$Xml$Xml.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/xml');
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

updatePet$Xml$Xml.PATH = '/pet';

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pet } from '../../models/pet';

export interface FindPetsByTags$Json$Params {

/**
 * Tags to filter by
 */
  tags?: Array<string>;
}

export function findPetsByTags$Json(http: HttpClient, rootUrl: string, params?: FindPetsByTags$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pet>>> {
  const rb = new RequestBuilder(rootUrl, findPetsByTags$Json.PATH, 'get');
  if (params) {
    rb.query('tags', params.tags, {"explode":true});
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

findPetsByTags$Json.PATH = '/pet/findByTags';

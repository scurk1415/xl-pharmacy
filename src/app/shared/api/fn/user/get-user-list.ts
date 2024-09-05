/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiUserRequest } from '../../models/api-user-request';
import { ApiUserResponse } from '../../models/api-user-response';

export interface GetUserList$Params {
  
    /**
     * Filter User
     */
    body?: ApiUserRequest
}

export function getUserList(http: HttpClient, rootUrl: string, params?: GetUserList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiUserResponse>>> {
  const rb = new RequestBuilder(rootUrl, getUserList.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApiUserResponse>>;
    })
  );
}

getUserList.PATH = '/users';

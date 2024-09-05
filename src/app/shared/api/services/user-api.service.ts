/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getUserList, GetUserList$Params } from '../fn/user/get-user-list';
import { ApiUserResponse } from '../models/api-user-response';

@Injectable({ providedIn: 'root' })
export class UserApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserList()` */
  static readonly GetUserListPath = '/users';

  /**
   * Get user list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserList()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUserList$Response(params?: GetUserList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApiUserResponse>>> {
    return getUserList(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user list.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserList$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUserList(params?: GetUserList$Params, context?: HttpContext): Observable<Array<ApiUserResponse>> {
    return this.getUserList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApiUserResponse>>): Array<ApiUserResponse> => r.body)
    );
  }

}

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponse } from '../../models/api-response';

export interface UploadFile$Params {

/**
 * ID of pet to update
 */
  petId: number;

/**
 * Additional Metadata
 */
  additionalMetadata?: string;
      body?: Blob
}

export function uploadFile(http: HttpClient, rootUrl: string, params: UploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
  const rb = new RequestBuilder(rootUrl, uploadFile.PATH, 'post');
  if (params) {
    rb.path('petId', params.petId, {});
    rb.query('additionalMetadata', params.additionalMetadata, {});
    rb.body(params.body, 'application/octet-stream');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponse>;
    })
  );
}

uploadFile.PATH = '/pet/{petId}/uploadImage';

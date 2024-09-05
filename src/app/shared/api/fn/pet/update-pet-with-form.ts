/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdatePetWithForm$Params {

/**
 * ID of pet that needs to be updated
 */
  petId: number;

/**
 * Name of pet that needs to be updated
 */
  name?: string;

/**
 * Status of pet that needs to be updated
 */
  status?: string;
}

export function updatePetWithForm(http: HttpClient, rootUrl: string, params: UpdatePetWithForm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, updatePetWithForm.PATH, 'post');
  if (params) {
    rb.path('petId', params.petId, {});
    rb.query('name', params.name, {});
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

updatePetWithForm.PATH = '/pet/{petId}';

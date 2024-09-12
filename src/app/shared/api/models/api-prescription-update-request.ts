/* tslint:disable */
/* eslint-disable */
import { ApiPrescriptionAlternative } from '../models/api-prescription-alternative';
export interface ApiPrescriptionUpdateRequest {
  alternatives: Array<ApiPrescriptionAlternative>;
  instructions?: string;
  quantity: number;
}

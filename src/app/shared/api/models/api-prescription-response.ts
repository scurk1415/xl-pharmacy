/* tslint:disable */
/* eslint-disable */
import { ApiCustomer } from '../models/api-customer';
export interface ApiPrescriptionResponse {
  customer: ApiCustomer;
  prescriptionDate: number;
  prescriptionId: number;
  prescriptionName: string;
  totalAmount: number;
}

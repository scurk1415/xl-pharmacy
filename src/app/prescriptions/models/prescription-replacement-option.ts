import { ApiPrescriptionReplacementResponse } from '@xl/api';

export type PrescriptionReplacementOption = Omit<ApiPrescriptionReplacementResponse, 'children'> & {
  selected: boolean,
  children?: PrescriptionReplacementOption[]
};

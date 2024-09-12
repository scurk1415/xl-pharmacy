import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SuggestedReplacement } from '../models/suggested-replacement';

export class FormHelper {

  static createForm() {
    return new FormGroup({
      quantity: new FormControl(1, { validators: [Validators.required], nonNullable: true }),
      instructions: new FormControl(''),
      alternatives: new FormArray<FormGroup<AlternativeGroup>>([], { validators: [Validators.required] })
    }, { updateOn: 'submit' });
  }

  static createAlternativeGroup(item: SuggestedReplacement) {
    return new FormGroup<AlternativeGroup>({
      id: new FormControl(item.id, { validators: [Validators.required], nonNullable: true }),
      label: new FormControl(item.label, { validators: [Validators.required], nonNullable: true }),
      stock: new FormControl(item.stockNumber, { validators: [Validators.required], nonNullable: true }),
      price: new FormControl(item.price, { validators: [Validators.required], nonNullable: true }),
      quantity: new FormControl(null, { validators: [Validators.required], nonNullable: true })
    });
  }

}

export interface AlternativeGroup {
  id: FormControl<number>;
  label: FormControl<string>;
  stock: FormControl<number>;
  price: FormControl<number>;
  quantity: FormControl<number | null>;
}

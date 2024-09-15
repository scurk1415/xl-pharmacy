import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SuggestedReplacement } from '../models/suggested-replacement';

export class FormHelper {

  static createForm() {
    return new FormGroup<MainFormGroup>({
      quantity: new FormControl(1, { validators: [Validators.required], nonNullable: true }),
      instructions: new FormControl(''),
      alternatives: new FormArray<FormGroup<AlternativeGroup>>([], { validators: [Validators.required] }),
      search: new FormControl(''),
      onlyAvailable: new FormControl(false),
      codes: new FormControl([])
    }, { updateOn: 'change', validators: [checkAlternativeQuantities()] });
  }

  static createAlternativeGroup(item: SuggestedReplacement) {
    return new FormGroup<AlternativeGroup>({
      id: new FormControl(item.id, { validators: [Validators.required], nonNullable: true }),
      label: new FormControl(item.label, { validators: [Validators.required], nonNullable: true }),
      stock: new FormControl(item.stockNumber, { validators: [Validators.required], nonNullable: true }),
      price: new FormControl(item.price, { validators: [Validators.required], nonNullable: true }),
      quantity: new FormControl(1, { validators: [Validators.required], nonNullable: true })
    });
  }

}

export interface MainFormGroup {
  quantity: FormControl<number>;
  instructions: FormControl<string | null>;
  alternatives: FormArray<FormGroup<AlternativeGroup>>;
  search: FormControl<string | null>,
  onlyAvailable: FormControl<boolean | null>,
  codes: FormControl<string[] | null>
}

export interface AlternativeGroup {
  id: FormControl<number>;
  label: FormControl<string>;
  stock: FormControl<number>;
  price: FormControl<number>;
  quantity: FormControl<number | null>;
}

export function checkAlternativeQuantities(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup<MainFormGroup>;

    const quantity = formGroup.controls.quantity.value;
    const alternatives = formGroup.controls.alternatives as FormArray<FormGroup<AlternativeGroup>>;

    if (!quantity || !alternatives) {
      return null;
    }

    const totalSelectedQuantity = alternatives.controls
      .map(altCtrl => altCtrl.controls.quantity.value || 0)
      .reduce((acc, value) => acc + value, 0);

    return totalSelectedQuantity > quantity ? { sumExceeded: true } : null;
  };
}

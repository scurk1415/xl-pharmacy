import { ChangeDetectionStrategy, Component, signal, forwardRef, input, effect } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrescriptionReplacementOption } from '../../models/prescription-replacement-option';

@Component({
  selector: 'xl-replacement-filter',
  standalone: true,
  imports: [],
  templateUrl: './replacement-filter.component.html',
  styleUrl: './replacement-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ReplacementFilterComponent),
    }
  ]
})
export class ReplacementFilterComponent implements ControlValueAccessor {

  options = input.required<PrescriptionReplacementOption[]>();

  protected innedOptions = signal<PrescriptionReplacementOption[]>([]);

  protected value = signal<string[]>([]);

  onChange = (value: string[]) => {};
  onTouched = () => {};

  constructor() {
    effect(() => {
      this.innedOptions.set(this.options());
    }, { allowSignalWrites: true });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string[]): void {
    this.value.set(obj);
  }

  toggle(item: PrescriptionReplacementOption, index: number) {
    const selectedValue = !item.selected;
    const newItem = {
      ...item,
      selected: selectedValue,
      children: item.children?.map(child => ({ ...child, selected: selectedValue }))
    }

    this.innedOptions.update(options => {
      options[index] = newItem;
      return options;
    });
    this.updateValue()
  }

  toggleChild(item: PrescriptionReplacementOption, childIndex: number, parent: PrescriptionReplacementOption, parentIndex: number) {
    const newItem = {
      ...item,
      selected: !item.selected
    };

    const newParent = {
      ...parent,
      children: parent.children?.map((child, index) => index === childIndex ? newItem : child)
    };

    this.innedOptions.update(options => {
      options[parentIndex] = newParent;
      return options;
    });
    this.updateValue()

  }

  private updateValue() {
    this.value.set(this.getSelectedItems());
    this.onChange(this.value());
  }

  private getSelectedItems() {
    let selected: string[] = [];
    this.innedOptions().forEach(it => {
      if (it.selected) {
        selected = [...selected, it.value!];
      }

      if (it.children) {
        it.children.forEach(child => {
          if (child.selected) {
            selected = [...selected, child.value!];
          }
        });
      }
    });

    return selected;
  }

}


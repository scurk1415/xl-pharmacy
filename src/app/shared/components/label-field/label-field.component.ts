import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'xl-label-field',
  standalone: true,
  imports: [],
  templateUrl: './label-field.component.html',
  styleUrl: './label-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.horizontal]': 'horizontal()'
  }
})
export class LabelFieldComponent {

  label = input.required();
  horizontal = input(false);

}

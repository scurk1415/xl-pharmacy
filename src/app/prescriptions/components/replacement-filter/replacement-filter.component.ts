import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiPrescriptionReplacementResponse } from '@xl/api';

@Component({
  selector: 'xl-replacement-filter',
  standalone: true,
  imports: [],
  templateUrl: './replacement-filter.component.html',
  styleUrl: './replacement-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplacementFilterComponent {

  options = input.required<ApiPrescriptionReplacementResponse[]>();

}


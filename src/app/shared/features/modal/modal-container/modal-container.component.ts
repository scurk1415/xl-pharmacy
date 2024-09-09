import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'xl-modal-container',
  standalone: true,
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent {
  private dialogRef = inject(DialogRef);

  title = input<string>();

  closeModal() {
    this.dialogRef.close();
  }

}

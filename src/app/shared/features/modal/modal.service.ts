import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalService = inject(Dialog);

  open<C, D>(component: ComponentType<C>, data: D, config?: Partial<ModalConfig>) {
    return this.modalService.open(component, {
      data: data,
      minWidth: '1000px',
      maxHeight: '95vh',
      ...config
    })
      .closed;
  }

}

interface ModalConfig {
  minWidth?: ModalSizeConfig;
  width?: ModalSizeConfig;
  maxHeight?: ModalSizeConfig;
}

type ModalSizeConfig = 'auto' | `${number}px` | `${number}%`;

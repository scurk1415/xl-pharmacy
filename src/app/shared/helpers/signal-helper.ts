import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export function toListSignal<T>(observable: Observable<T[]>) {
  return toSignal<T[], T[]>(observable, { initialValue: []});
}

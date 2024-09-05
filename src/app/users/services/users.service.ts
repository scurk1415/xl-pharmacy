import { Injectable, inject } from '@angular/core';
import { UserApiService, ApiUserResponse } from '@xl/api';
import { catchError, of } from 'rxjs';
import { toListSignal } from '@xl/shared/helpers/signal-helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userApiService = inject(UserApiService);

  getUsers() {
    return toListSignal(this.userApiService.getUserList()
      .pipe(
        catchError(() => of(users))
      ));
  }
}

const users: ApiUserResponse[] = [
  { userId: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'Admin' }
]

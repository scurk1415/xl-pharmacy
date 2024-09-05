import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from '@xl/shared/components/table/table.module';
import { FilterPageDirective } from '@xl/shared/components/filterPage/filter-page.directive';
import { ApiUserResponse } from '@xl/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'xl-user-management',
  standalone: true,
  imports: [TableModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserManagementComponent extends FilterPageDirective<ApiUserResponse> {

  private usersService = inject(UsersService);

  data = this.usersService.getUsers();

  getColumns() {
    return [
      { label: 'Id' },
      { label: 'Name' },
      { label: 'Email' },
      { label: 'Role' }
    ];
  }

}

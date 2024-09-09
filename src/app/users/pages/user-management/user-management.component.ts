import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiUserResponse } from '@xl/api';
import { UsersService } from '../../services/users.service';
import { TableModule } from '@xl/shared/features/table/table.module';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';

@Component({
  selector: 'xl-user-management',
  standalone: true,
  imports: [TableModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserManagementComponent extends TableBase<ApiUserResponse> {

  private usersService = inject(UsersService);

  override data = this.usersService.getUsers();

  override getColumns() {
    return [
      { label: 'Id' },
      { label: 'Name' },
      { label: 'Email' },
      { label: 'Role' }
    ];
  }

}

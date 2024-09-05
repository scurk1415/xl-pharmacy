import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'xl-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  protected menuItems = this.prepareMenuItems();

  private prepareMenuItems() {
    return signal([
      { label: 'Products', path: '/products' },
      { label: 'Orders', path: '/orders' },
      { label: 'Users', path: '/users' }
    ]);
  }

}

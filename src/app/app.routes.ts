import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: '/products/manage', pathMatch: 'full' },
  { path: 'orders', loadChildren: () => import('./orders/orders.routes') },
  { path: 'products', loadChildren: () => import('./products/products.routes') },
  { path: 'users', loadChildren: () => import('./users/users.routes') },
  // { path: '**', redirectTo: '/products/manage', pathMatch: 'full' },
];

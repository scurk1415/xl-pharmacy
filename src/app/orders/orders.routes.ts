import { Routes } from '@angular/router';

export default [
  { path: 'manage', loadComponent: () => import('./pages/order-management/order-management.component') },
  { path: '', redirectTo: '/orders/manage', pathMatch: 'full' },
] as Routes;

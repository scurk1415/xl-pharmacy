import { Routes } from '@angular/router';

export default [
  { path: 'manage', loadComponent: () => import('./pages/product-management/product-management.component') },
  { path: '', redirectTo: '/products/manage', pathMatch: 'full' },
] as Routes;

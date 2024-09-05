import { Routes } from '@angular/router';

export default [
  { path: 'manage', loadComponent: () => import('./pages/user-management/user-management.component') },
  { path: '', redirectTo: '/users/manage', pathMatch: 'full' },
] as Routes;

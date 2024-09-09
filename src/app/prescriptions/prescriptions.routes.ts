import { Routes } from '@angular/router';

export default [
  { path: 'manage', loadComponent: () => import('./pages/prescription-management/prescription-management.component') },
  { path: '', redirectTo: '/prescriptions/manage', pathMatch: 'full' },
] as Routes;

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'prescriptions', loadChildren: () => import('./prescriptions/prescriptions.routes') },
  { path: 'users', loadChildren: () => import('./users/users.routes') },
  { path: '**', redirectTo: '/prescriptions/manage', pathMatch: 'full' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: '/products/manage', pathMatch: 'full' },
  { path: 'prescriptions', loadChildren: () => import('./prescriptions/prescriptions.routes') },
  { path: 'users', loadChildren: () => import('./users/users.routes') },
  // { path: '**', redirectTo: '/products/manage', pathMatch: 'full' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'loginsignup', pathMatch: 'full' },
  { path: 'loginsignup', loadComponent: () => import('./Pages/login-singup/login-signup.component').then(m => m.LoginSignupComponent) },
  { path: 'register', loadComponent: () => import('./Pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./Pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
];

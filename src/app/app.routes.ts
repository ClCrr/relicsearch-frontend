import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login';
import { DashboardComponent } from './page/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];

import { Login } from './login/login';
import { Welcome } from './welcome/welcome';
import { AuthGuard } from './services/auth-guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'welcome', component: Welcome, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];



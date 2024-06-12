import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskComponent } from './pages/task/task.component';

import { AuthGuard } from './services/auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

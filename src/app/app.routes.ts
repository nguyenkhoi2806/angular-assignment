import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskComponent } from './pages/task/task.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

import { LayoutComponent } from './layout/layout.component';

import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'tasks/create', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskFormComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

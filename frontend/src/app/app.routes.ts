import { Routes } from '@angular/router';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { AuthGuard } from './config/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent 
  },
  {
    path: 'home',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./home.routes').then((routes) => routes.HomeRoutes)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

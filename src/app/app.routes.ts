import { Routes } from '@angular/router';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'financeiro',
    component: FinanceiroComponent,
    canActivate: [authGuard],
  },
];

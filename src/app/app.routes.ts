// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

// Importe seus componentes standalone
import { AlmoxarifadoDashboardComponent } from './features/almoxarifado/almoxarifado-dashboard/almoxarifado-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { GroupSettingsComponent } from './features/configuracoes/group-settings/group-settings.component';
import { UsuarioFormComponent } from './features/configuracoes/usuarios/usuario-form/usuario-form.component';
import { UsuariosListComponent } from './features/configuracoes/usuarios/usuarios-list/usuarios-list.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { FinanceiroDashboardComponent } from './features/financeiro/financeiro-dashboard/financeiro-dashboard.component';
import { LojaDashboardComponent } from './features/loja/loja-dashboard/loja-dashboard.component';
import { PessoasDashboardComponent } from './features/pessoas/pessoas-dashboard/pessoas-dashboard.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', // Rota pai para o layout principal
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protege todas as rotas filhas
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redireciona para home por padrão
      { path: 'home', component: HomeComponent, title: 'ScoutCalendar - Home' },
      { path: 'loja', component: LojaDashboardComponent, title: 'Loja' },
      {
        path: 'financeiro',
        component: FinanceiroDashboardComponent,
        title: 'Financeiro',
      },
      {
        path: 'almoxarifado',
        component: AlmoxarifadoDashboardComponent,
        title: 'Almoxarifado',
      },
      {
        path: 'pessoas',
        component: PessoasDashboardComponent,
        title: 'Pessoas e Escoteiros',
      },
      {
        path: 'configuracoes',
        title: 'Configurações',
        children: [
          { path: '', redirectTo: 'usuarios', pathMatch: 'full' }, // Default para usuários
          {
            path: 'usuarios',
            component: UsuariosListComponent,
            title: 'Usuários',
          },
          {
            path: 'usuarios/novo',
            component: UsuarioFormComponent,
            title: 'Novo Usuário',
          },
          {
            path: 'usuarios/editar/:id',
            component: UsuarioFormComponent,
            title: 'Editar Usuário',
          }, // :id é o UID do Firebase Auth
          {
            path: 'grupo',
            component: GroupSettingsComponent,
            title: 'Configurações do Grupo',
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'home' }, // Rota curinga, redireciona para home se logado, ou login guard irá tratar
];

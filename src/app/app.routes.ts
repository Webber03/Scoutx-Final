// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { JogadorList } from './components/jogador-list/jogador-list';
import { Login } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';
import { authGuard } from '../auth.guard/auth.guard'; // Importe o guarda
import { DashboardComponent } from './components/dashboard/dashboard';
import { ComoUtilizar } from './components/como-utilizar/como-utilizar';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: JogadorList, canActivate: [authGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [authGuard] }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'como-utilizar', component: ComoUtilizar,canActivate: [authGuard]}
];
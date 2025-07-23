// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { JogadorList } from './components/jogador-list/jogador-list';
import { Login } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';
import { authGuard } from './auth.guard'; // Importe o guarda

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: JogadorList, canActivate: [authGuard] }, // Protegida
  { path: 'cadastro', component: CadastroComponent, canActivate: [authGuard] }, // Protegida
];
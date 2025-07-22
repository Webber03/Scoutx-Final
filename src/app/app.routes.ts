// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { JogadorList } from './components/jogador-list/jogador-list';
import { Login } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: JogadorList },
  { path: 'cadastro', component: CadastroComponent },
  // Removida a rota '{path: 'filtros', component: JogadorFiltrosComponent}'
  // Removida toda a estrutura de rotas aninhadas com MainLayoutComponent
];
// src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Para links de navegação

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink para links de navegação
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  // Método para simular o deslogar (você integrará com seu AuthService real depois)
  deslogar(): void {
    console.log('Usuário deslogado!');
    // *** AQUI VOCÊ ADICIONARIA A LÓGICA REAL DE DESLOGAR: ***
    // 1. Chamar um serviço de autenticação (ex: AuthService.logout())
    // 2. Limpar tokens/sessões (localStorage.removeItem('token'))
    // 3. Redirecionar para a tela de login (this.router.navigate(['/login']))

    // Por enquanto, apenas um alerta e recarrega a página para simular um reset
    alert('Você foi deslogado (simulação)!');
    window.location.reload(); // Isso é uma simulação, não use em produção para logout real!
  }
}
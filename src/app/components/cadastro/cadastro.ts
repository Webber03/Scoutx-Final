// Cadastro.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cadastro-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  termosAceitos: boolean = false;

  @Input() fechar!: () => void; 

  enviar() {
    console.log('Cadastro enviado:', this.nome, this.email, this.senha);
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!this.termosAceitos) {
      alert('Você precisa aceitar os termos de uso para continuar!');
      return;
    }

    this.fechar();
  }
}
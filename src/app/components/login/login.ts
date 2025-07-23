// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  mostrarModalCadastro: boolean = false;
  mensagemErro: string | null = null;

  constructor(private router: Router) { }

  login() {
    const usuarioValido = 'usuario';
    const senhaValida = 'login123';

    this.mensagemErro = null;

    if (this.username === usuarioValido && this.password === senhaValida) {
      localStorage.setItem('isLoggedIn', 'true'); // Define o estado de logado
      this.router.navigate(['/home']);
    } else {
      this.mensagemErro = 'Usuário ou senha incorretos.';
    }
  }

  cadastro() {
    console.log('Exibindo modal de Cadastro');
    this.mostrarModalCadastro = true;
  }

  fecharModalCadastro() {
    this.mostrarModalCadastro = false;
  }
}
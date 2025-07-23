// src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  constructor(private router: Router) { }

  deslogar(): void {
    localStorage.removeItem('isLoggedIn');
    console.log('Usuário deslogado!');
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
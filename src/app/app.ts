
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router'; // Importe Router, NavigationEnd
import { SidebarComponent } from './components/sidebar/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators'; // Para filtrar eventos do Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit { // Implemente OnInit
  title = 'ScoutXApp';
  isSidebarOpen: boolean = false;
  showSidebarAndToggle: boolean = false; // NOVA PROPRIEDADE para controlar a visibilidade total

  constructor(private router: Router) {} // Injete o Router

  ngOnInit(): void {
    // Escuta eventos de navegação do Router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtra apenas eventos de fim de navegação
    ).subscribe((event: NavigationEnd) => {
      // Verifica se a URL atual é '/login' ou '/cadastro'
      if (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/cadastro') {
        this.showSidebarAndToggle = false; // Esconde sidebar e botão
        this.isSidebarOpen = false; // Garante que a sidebar esteja fechada
      } else {
        this.showSidebarAndToggle = true; // Mostra sidebar e botão
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
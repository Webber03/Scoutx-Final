// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Certifique-se que o import está correto
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa suas rotas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
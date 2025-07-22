import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Jogador {
  id: number;
  nome: string;
  idade: number;
  nacionalidade: string;
  posicao: string;
  clube: string;
  foto: string;
  gols: number;
  assistencias: number;
  mediaInterceptacoes: number
  mediaCortes: number;
  jogosSemSofrerGol: number;
  mediaDefesas: number;
}

@Injectable({
  providedIn: 'root'
})
export class JogadorService {
  private apiUrl = 'http://localhost:4000/jogadores';

  constructor(private http: HttpClient) {}

  getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl);
  }
}

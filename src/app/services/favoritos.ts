// src/app/services/favoritos.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogador } from '../components/jogador-list/jogador-list'; // Importe a interface Jogador

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritosKey = 'favoritedPlayerIds';
  private _favoritedPlayerIds = new BehaviorSubject<number[]>(this.loadFavorites()); // Armazena apenas os IDs
  favoritedPlayerIds$: Observable<number[]> = this._favoritedPlayerIds.asObservable();

  constructor() { }

  private loadFavorites(): number[] {
    const storedIds = localStorage.getItem(this.favoritosKey);
    return storedIds ? JSON.parse(storedIds) : [];
  }

  private saveFavorites(ids: number[]): void {
    localStorage.setItem(this.favoritosKey, JSON.stringify(ids));
    this._favoritedPlayerIds.next(ids); // Notifica os assinantes
  }

  isFavorited(jogadorId: number): boolean {
    return this.loadFavorites().includes(jogadorId);
  }

  toggleFavorite(jogadorId: number): void {
    let currentFavorites = this.loadFavorites();
    const index = currentFavorites.indexOf(jogadorId);

    if (index > -1) {
      // Remover
      currentFavorites.splice(index, 1);
      console.log(`Jogador ID ${jogadorId} removido dos favoritos.`);
    } else {
      // Adicionar
      currentFavorites.push(jogadorId);
      console.log(`Jogador ID ${jogadorId} adicionado aos favoritos.`);
    }
    this.saveFavorites(currentFavorites);
  }

  // NOVO MÉTODO: Para o Dashboard buscar os dados completos dos jogadores
  // IMPORTANTE: Este método é um MOCK. Você precisará de uma API real ou de uma lista global de jogadores.
  // Por enquanto, vamos simular buscando de uma lista de todos os jogadores (que ainda não temos uma centralizada).
  // Seus dados de jogadores devem vir de algum lugar (API, mock local, etc.)
  getFavoritedPlayers(allPlayers: Jogador[]): Jogador[] {
    const favoritedIds = this.loadFavorites();
    return allPlayers.filter(player => favoritedIds.includes(player.id as number));
  }
}
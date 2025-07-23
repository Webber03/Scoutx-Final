import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogador } from '../components/jogador-list/jogador-list';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritosKey = 'favoritedPlayerIds';
  private _favoritedPlayerIds = new BehaviorSubject<number[]>(this.loadFavoritesFromLocalStorage());
  favoritedPlayerIds$: Observable<number[]> = this._favoritedPlayerIds.asObservable();

  constructor() { }

  private loadFavoritesFromLocalStorage(): number[] {
    const storedIds = localStorage.getItem(this.favoritosKey);
    // console.log('Carregando favoritos do localStorage:', storedIds ? JSON.parse(storedIds) : []);
    // Garante que todos os IDs carregados do localStorage sejam números, caso algum tenha sido salvo como string
    return storedIds ? JSON.parse(storedIds).map((id: any) => Number(id)) : [];
  }

  private saveFavoritesToLocalStorage(ids: number[]): void {
    localStorage.setItem(this.favoritosKey, JSON.stringify(ids));
    this._favoritedPlayerIds.next(ids);
    // console.log('Salvando favoritos no localStorage e emitindo:', ids);
  }

  getFavoritedPlayerIds(): number[] {
    return this._favoritedPlayerIds.value;
  }

  isFavorited(jogadorId: number): boolean {
    // Garante que o ID sendo checado seja um número
    return this._favoritedPlayerIds.value.includes(Number(jogadorId));
  }

  toggleFavorite(jogadorId: number): void {
    // Garante que o ID recebido seja convertido para número antes de qualquer operação
    const idAsNumber = Number(jogadorId); 
    let currentFavorites = [...this._favoritedPlayerIds.value]; 
    const index = currentFavorites.indexOf(idAsNumber); // Usa o ID numérico para encontrar

    if (index > -1) {
      currentFavorites.splice(index, 1);
      console.log(`Jogador ID ${idAsNumber} removido dos favoritos.`);
    } else {
      currentFavorites.push(idAsNumber); // Adiciona o ID numérico
      console.log(`Jogador ID ${idAsNumber} adicionado aos favoritos.`);
    }
    this.saveFavoritesToLocalStorage(currentFavorites);
  }

  getFavoritedPlayers(allPlayers: Jogador[]): Jogador[] {
    const favoritedIds = this._favoritedPlayerIds.value;
    // Garante que o player.id também seja tratado como número na comparação
    return allPlayers.filter(player => favoritedIds.includes(Number(player.id))); 
  }
}
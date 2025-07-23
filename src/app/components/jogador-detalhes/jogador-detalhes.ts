// src/app/components/jogador-detalhes/jogador-detalhes.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'; // Adicionado OnDestroy
import { CommonModule, DecimalPipe } from '@angular/common';
import { Jogador } from '../jogador-list/jogador-list';
import { FavoritosService } from '../../services/favoritos'; // Importe o serviço
import { Subscription } from 'rxjs'; // Importe Subscription

@Component({
  selector: 'app-jogador-detalhes',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './jogador-detalhes.html',
  styleUrls: ['./jogador-detalhes.css']
})
export class JogadorDetalhesComponent implements OnInit, OnDestroy { // Implemente OnDestroy
  @Input() jogador: Jogador | null = null;
  @Output() fechar = new EventEmitter<void>();

  isFavorited: boolean = false;
  private favoriteSubscription: Subscription | undefined; // Para desinscrever do Observable

  constructor(private favoritosService: FavoritosService) {} // Injete o serviço

  ngOnInit(): void {
    // Inscreva-se para mudanças na lista de favoritos
    this.favoriteSubscription = this.favoritosService.favoritedPlayerIds$.subscribe(ids => {
      if (this.jogador && this.jogador.id !== undefined) {
        this.isFavorited = ids.includes(this.jogador.id);
      } else {
        this.isFavorited = false;
      }
    });
  }

  ngOnDestroy(): void { // NOVO: Desinscrever para evitar vazamento de memória
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  toggleFavorite(): void {
    if (this.jogador && this.jogador.id !== undefined) {
      this.favoritosService.toggleFavorite(this.jogador.id);
      // isFavorited será atualizado automaticamente via assinatura no ngOnInit
    }
  }

  closeModal(): void {
    this.fechar.emit();
  }
}
// src/app/components/dashboard/dashboard.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jogador } from '../jogador-list/jogador-list';
import { FavoritosService } from '../../services/favoritos'; // CORRIGIDO O CAMINHO
import { Subscription } from 'rxjs';
import { JogadorDetalhesComponent } from '../jogador-detalhes/jogador-detalhes'; // CORRIGIDO O CAMINHO E IMPORTADO

// JogadorCompararComponent foi removido daqui pois não é usado neste componente.
// Se você for adicionar funcionalidade de comparação também no dashboard,
// adicione-o novamente e inclua-o no array 'imports' abaixo.

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    JogadorDetalhesComponent // ADICIONADO AQUI para standalone
  ],
  templateUrl: './dashboard.html', // CORRIGIDO O CAMINHO
  styleUrls: ['./dashboard.css'] // CORRIGIDO O CAMINHO
})
export class DashboardComponent implements OnInit, OnDestroy {
  favoritedPlayers: Jogador[] = [];
  private favoriteSubscription: Subscription | undefined;

  // PROPRIEDADES PARA CONTROLAR O MODAL DE DETALHES - ADICIONADAS AQUI
  showDetalhesModal: boolean = false;
  jogadorSelecionado: Jogador | null = null;

  allAvailablePlayers: Jogador[] = [
    // Seus dados de jogadores estão ótimos aqui, com gols/assistencias como números!
    {
      "id": 1,
      "nome": "Lionel Messi",
      "idade": 38,
      "nacionalidade": "Argentina",
      "posicao": "Atacante",
      "clube": "Inter Miami",
      "foto": "https://i.pinimg.com/1200x/de/0f/4f/de0f4f4319b6e190c17865e31dc4edef.jpg",
      "gols": 15,
      "assistencias": 14,
      "numeroCamisa": 10,
      "mapaCalor": "mapacalor/messi.png",
      "nota": 8.9,
      "peDominante": "Esquerdo",
      "altura": 1.7,
      "valorMercado": 35
    },
    {
      "id": 2,
      "nome": "Cristiano Ronaldo",
      "idade": 40,
      "nacionalidade": "Portugal",
      "posicao": "Atacante",
      "clube": "Al Nassr",
      "foto": "https://p4.wallpaperbetter.com/wallpaper/874/671/650/soccer-cristiano-ronaldo-portuguese-wallpaper-preview.jpg",
      "gols": 45,
      "assistencias": 9,
      "numeroCamisa": 7,
      "mapaCalor": "mapacalor/cr7.png",
      "nota": 8.7,
      "peDominante": "Direito",
      "altura": 1.87,
      "valorMercado": 25
    },
    {
      "id": 3,
      "nome": "Neymar Jr.",
      "idade": 33,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Santos",
      "foto": "https://img.sofascore.com/api/v1/player/124712/image",
      "gols": 37,
      "assistencias": 16,
      "numeroCamisa": 10,
      "mapaCalor": "mapacalor/neymar.png",
      "nota": 8.5,
      "peDominante": "Direito",
      "altura": 1.75,
      "valorMercado": 45
    },
    {
      "id": 4,
      "nome": "Kylian Mbappé",
      "idade": 26,
      "nacionalidade": "França",
      "posicao": "Atacante",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/826643/image",
      "gols": 32,
      "assistencias": 12,
      "numeroCamisa": 9,
      "mapaCalor": "mapacalor/mbappe.png",
      "nota": 9.1,
      "peDominante": "Direito",
      "altura": 1.78,
      "valorMercado": 180
    },
    {
      "id": 5,
      "nome": "Erling Haaland",
      "idade": 24,
      "nacionalidade": "Noruega",
      "posicao": "Atacante",
      "clube": "Manchester City",
      "foto": "https://img.sofascore.com/api/v1/player/839956/image",
      "gols": 42,
      "assistencias": 6,
      "numeroCamisa": 9,
      "mapaCalor": "mapacalor/haaland.png",
      "nota": 9.0,
      "peDominante": "Esquerdo",
      "altura": 1.94,
      "valorMercado": 175
    },
    {
      "id": 6,
      "nome": "Kevin De Bruyne",
      "idade": 33,
      "nacionalidade": "Bélgica",
      "posicao": "Meio-campista",
      "clube": "Napoli",
      "foto": "https://img.sofascore.com/api/v1/player/70996/image",
      "gols": 10,
      "assistencias": 24,
      "numeroCamisa": 17,
      "mapaCalor": "mapacalor/debruyne.png",
      "nota": 8.8,
      "peDominante": "Direito",
      "altura": 1.81,
      "valorMercado": 60
    },
    {
      "id": 7,
      "nome": "Vinícius Jr.",
      "idade": 24,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/868812/image",
      "gols": 21,
      "assistencias": 13,
      "numeroCamisa": 7,
      "mapaCalor": "mapacalor/Vini.png",
      "nota": 8.7,
      "peDominante": "Direito",
      "altura": 1.76,
      "valorMercado": 150
    },
    {
      "id": 8,
      "nome": "Luka Modrić",
      "idade": 38,
      "nacionalidade": "Croácia",
      "posicao": "Meio-campista",
      "clube": "Milan",
      "foto": "https://img.sofascore.com/api/v1/player/15466/image",
      "gols": 4,
      "assistencias": 10,
      "numeroCamisa": 10,
      "mapaCalor": "mapacalor/modric.png",
      "nota": 8.3,
      "peDominante": "Direito",
      "altura": 1.72,
      "valorMercado": 10
    },
    {
      "id": 9,
      "nome": "Jude Bellingham",
      "idade": 22,
      "nacionalidade": "Inglaterra",
      "posicao": "Meio-campista",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/991011/image",
      "gols": 19,
      "assistencias": 8,
      "numeroCamisa": 5,
      "mapaCalor": "mapacalor/belli.png",
      "nota": 8.9,
      "peDominante": "Direito",
      "altura": 1.86,
      "valorMercado": 180
    },
    {
      "id": 10,
      "nome": "Mohamed Salah",
      "idade": 32,
      "nacionalidade": "Egito",
      "posicao": "Atacante",
      "clube": "Liverpool",
      "foto": "https://img.sofascore.com/api/v1/player/159665/image",
      "gols": 29,
      "assistencias": 11,
      "numeroCamisa": 11,
      "mapaCalor": "mapacalor/salah.png",
      "nota": 8.6,
      "peDominante": "Esquerdo",
      "altura": 1.75,
      "valorMercado": 65
    },
    {
      "id": 11,
      "nome": "Virgil van Dijk",
      "idade": 33,
      "nacionalidade": "Holanda",
      "posicao": "Zagueiro",
      "clube": "Liverpool",
      "foto": "https://img.sofascore.com/api/v1/player/151545/image",
      "numeroCamisa": 4,
      "mediaCortes": 4.3,
      "mediaInterceptacoes": 2.1,
      "mapaCalor": "mapacalor/vvj.png",
      "nota": 8.5,
      "peDominante": "Direito",
      "altura": 1.93,
      "valorMercado": 35
    },
    {
      "id": 12,
      "nome": "Thibaut Courtois",
      "idade": 33,
      "nacionalidade": "Bélgica",
      "posicao": "Goleiro",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/70988/image",
      "numeroCamisa": 1,
      "jogosSemSofrerGol": 18,
      "mediaDefesas": 3.1,
      "nota": 8.7,
      "mapaCalor": "mapacalor/court.png",
      "peDominante": "Esquerdo",
      "altura": 1.99,
      "valorMercado": 45
    },
    {
      "id": 13,
      "nome": "Éder Militão",
      "idade": 27,
      "nacionalidade": "Brasil",
      "posicao": "Zagueiro",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/822519/image",
      "numeroCamisa": 3,
      "mediaCortes": 3.7,
      "mediaInterceptacoes": 1.9,
      "mapaCalor": "mapacalor/militao.png",
      "nota": 8.2,
      "peDominante": "Direito",
      "altura": 1.86,
      "valorMercado": 60
    },
    {
      "id": 14,
      "nome": "João Cancelo",
      "idade": 30,
      "nacionalidade": "Portugal",
      "posicao": "Lat. Direito",
      "clube": "Al-Hilal",
      "foto": "https://img.sofascore.com/api/v1/player/138892/image",
      "gols": 4,
      "assistencias": 7,
      "numeroCamisa": 2,
      "mapaCalor": "mapacalor/cancelo.png",
      "nota": 8.1,
      "peDominante": "Direito",
      "altura": 1.82,
      "valorMercado": 40
    },
    {
      "id": 15,
      "nome": "Andrew Robertson",
      "idade": 31,
      "nacionalidade": "Escócia",
      "posicao": "Lat. Esquerdo",
      "clube": "Liverpool",
      "foto": "https://img.sofascore.com/api/v1/player/262911/image",
      "gols": 1,
      "assistencias": 6,
      "numeroCamisa": 26,
      "mapaCalor": "mapacalor/robert.png",
      "nota": 8.0,
      "peDominante": "Esquerdo",
      "altura": 1.78,
      "valorMercado": 35
    },
    {
      "id": 16,
      "nome": "Achraf Hakimi",
      "idade": 26,
      "nacionalidade": "Marrocos",
      "posicao": "Lat. Direito",
      "clube": "PSG",
      "foto": "https://img.sofascore.com/api/v1/player/814594/image",
      "gols": 5,
      "assistencias": 8,
      "numeroCamisa": 2,
      "mapaCalor": "mapacalor/hakimi.png",
      "nota": 8.2,
      "peDominante": "Direito",
      "altura": 1.81,
      "valorMercado": 65
    },
    {
      "id": 17,
      "nome": "Casemiro",
      "idade": 33,
      "nacionalidade": "Brasil",
      "posicao": "Volante",
      "clube": "Manchester United",
      "foto": "https://img.sofascore.com/api/v1/player/122951/image",
      "gols": 7,
      "assistencias": 3,
      "numeroCamisa": 18,
      "mapaCalor": "mapacalor/casemiro.png",
      "nota": 8.0,
      "peDominante": "Direito",
      "altura": 1.85,
      "valorMercado": 30
    },
    {
      "id": 18,
      "nome": "Rodri",
      "idade": 29,
      "nacionalidade": "Espanha",
      "posicao": "Volante",
      "clube": "Manchester City",
      "foto": "https://img.sofascore.com/api/v1/player/827606/image",
      "gols": 6,
      "assistencias": 9,
      "numeroCamisa": 16,
      "mapaCalor": "mapacalor/Rodri.png",
      "nota": 8.8,
      "peDominante": "Direito",
      "altura": 1.90,
      "valorMercado": 100
    },
    {
      "id": 19,
      "nome": "Joshua Kimmich",
      "idade": 30,
      "nacionalidade": "Alemanha",
      "posicao": "Volante",
      "clube": "Bayern de Munique",
      "foto": "https://img.sofascore.com/api/v1/player/259117/image",
      "gols": 4,
      "assistencias": 10,
      "numeroCamisa": 6,
      "mapaCalor": "mapacalor/Kimmich.png",
      "nota": 8.4,
      "peDominante": "Direito",
      "altura": 1.76,
      "valorMercado": 65
    },
    {
      "id": 20,
      "nome": "Alisson Becker",
      "idade": 32,
      "nacionalidade": "Brasil",
      "posicao": "Goleiro",
      "clube": "Liverpool",
      "foto": "https://img.sofascore.com/api/v1/player/243609/image",
      "numeroCamisa": 1,
      "jogosSemSofrerGol": 17,
      "mediaDefesas": 3.4,
      "nota": 8.8,
      "peDominante": "Direito",
      "altura": 1.91,
      "valorMercado": 35,
      "mapaCalor": ''
    },
    {
      "id": 21,
      "nome": "Luis Suárez",
      "idade": 38,
      "nacionalidade": "Uruguai",
      "posicao": "Atacante",
      "clube": "Inter Miami",
      "foto": "https://img.sofascore.com/api/v1/player/16943/image",
      "gols": 19,
      "assistencias": 7,
      "numeroCamisa": 9,
      "mapaCalor": "mapacalor/Suarez.png",
      "nota": 8.1,
      "peDominante": "Direito",
      "altura": 1.82,
      "valorMercado": 8
    },
    {
      "id": 22,
      "nome": "James Rodríguez",
      "idade": 33,
      "nacionalidade": "Colômbia",
      "posicao": "Meio-campista",
      "clube": "Club León",
      "foto": "https://img.sofascore.com/api/v1/player/107414/image",
      "gols": 4,
      "assistencias": 6,
      "numeroCamisa": 10,
      "mapaCalor": "mapacalor/james.png",
      "nota": 7.8,
      "peDominante": "Esquerdo",
      "altura": 1.80,
      "valorMercado": 12
    },
    {
      "id": 23,
      "nome": "Gabriel Barbosa",
      "idade": 28,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Flamengo",
      "foto": "https://img.sofascore.com/api/v1/player/358554/image",
      "gols": 12,
      "assistencias": 5,
      "numeroCamisa": 9,
      "mapaCalor": "mapacalor/gabigol.png",
      "nota": 7.9,
      "peDominante": "Direito",
      "altura": 1.78,
      "valorMercado": 25
    },
    {
      "id": 24,
      "nome": "Marquinhos",
      "idade": 30,
      "nacionalidade": "Brasil",
      "posicao": "Zagueiro",
      "clube": "PSG",
      "foto": "https://img.sofascore.com/api/v1/player/155995/image",
      "mediaCortes": 3.4,
      "mediaInterceptacoes": 1.8,
      "numeroCamisa": 5,
      "mapaCalor": "mapacalor/marquinhos.png",
      "nota": 8.3,
      "peDominante": "Direito",
      "altura": 1.83,
      "valorMercado": 55
    },
    {
      "id": 25,
      "nome": "Antony",
      "idade": 24,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Manchester United",
      "foto": "https://img.sofascore.com/api/v1/player/958380/image",
      "gols": 6,
      "assistencias": 4,
      "numeroCamisa": 21,
      "mapaCalor": "mapacalor/antony.png",
      "nota": 7.5,
      "peDominante": "Esquerdo",
      "altura": 1.74,
      "valorMercado": 35
    },
    {
      "id": 26,
      "nome": "Lamine Yamal",
      "idade": 18,
      "nacionalidade": "Espanha",
      "posicao": "Atacante",
      "clube": "Barcelona",
      "foto": "https://img.sofascore.com/api/v1/player/1402912/image",
      "gols": 7,
      "assistencias": 11,
      "numeroCamisa": 27,
      "mapaCalor": "mapacalor/yamal.png",
      "nota": 8.2,
      "peDominante": "Esquerdo",
      "altura": 1.78,
      "valorMercado": 75
    },
    {
      "id": 27,
      "nome": "Phil Foden",
      "idade": 25,
      "nacionalidade": "Inglaterra",
      "posicao": "Meio-campista",
      "clube": "Manchester City",
      "foto": "https://img.sofascore.com/api/v1/player/859765/image",
      "gols": 18,
      "assistencias": 11,
      "numeroCamisa": 47,
      "mapaCalor": "mapacalor/foden.png",
      "nota": 8.6,
      "peDominante": "Esquerdo",
      "altura": 1.71,
      "valorMercado": 110
    },
    {
      "id": 28,
      "nome": "Raphinha",
      "idade": 28,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Barcelona",
      "foto": "https://img.sofascore.com/api/v1/player/831005/image",
      "gols": 7,
      "assistencias": 9,
      "numeroCamisa": 11,
      "mapaCalor": "mapacalor/raphinha.png",
      "nota": 8.0,
      "peDominante": "Esquerdo",
      "altura": 1.76,
      "valorMercado": 50
    },
    {
      "id": 29,
      "nome": "Ángel Di María",
      "idade": 37,
      "nacionalidade": "Argentina",
      "posicao": "Meio-campista",
      "clube": "Rosario Central",
      "foto": "https://img.sofascore.com/api/v1/player/30027/image",
      "gols": 5,
      "assistencias": 7,
      "numeroCamisa": 11,
      "mapaCalor": "mapacalor/dimaria.png",
      "nota": 8.0,
      "peDominante": "Esquerdo",
      "altura": 1.80,
      "valorMercado": 12
    },
    {
      "id": 30,
      "nome": "Endrick",
      "idade": 18,
      "nacionalidade": "Brasil",
      "posicao": "Atacante",
      "clube": "Real Madrid",
      "foto": "https://img.sofascore.com/api/v1/player/1174937/image",
      "gols": 11,
      "assistencias": 2,
      "numeroCamisa": 16,
      "mapaCalor": "mapacalor/endrick.png",
      "nota": 8.1,
      "peDominante": "Direito",
      "altura": 1.73,
      "valorMercado": 55
    },
    {
      "id": 31,
      "nome": "Manuel Neuer",
      "idade": 38,
      "nacionalidade": "Alemanha",
      "posicao": "Goleiro",
      "clube": "Bayern de Munique",
      "foto": "https://img.sofascore.com/api/v1/player/8959/image",
      "numeroCamisa": 1,
      "mapaCalor": "mapacalor/neuer.png",
      "jogosSemSofrerGol": 12,
      "mediaDefesas": 2.8,
      "nota": 8.4,
      "peDominante": "Direito",
      "altura": 1.93,
      "valorMercado": 8
    }
  ];

  constructor(public favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.favoriteSubscription = this.favoritosService.favoritedPlayerIds$.subscribe(() => {
      this.loadFavoritedPlayers();
    });
    this.loadFavoritedPlayers();
  }

  ngOnDestroy(): void {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  private loadFavoritedPlayers(): void {
    this.favoritedPlayers = this.favoritosService.getFavoritedPlayers(this.allAvailablePlayers);
  }


  openDetalhesModal(jogador: Jogador): void {
    this.jogadorSelecionado = jogador;
    this.showDetalhesModal = true;     
  }

  closeDetalhesModal(): void {
    this.showDetalhesModal = false;    
    this.jogadorSelecionado = null;    
  }
}
// src/app/components/jogador-list/jogador-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JogadorFiltros, JogadorFiltrosComponent } from '../jogador-filtros/jogador-filtros'; // Caminho para JogadorFiltrosComponent
import { JogadorDetalhesComponent } from '../jogador-detalhes/jogador-detalhes'; // Importa o NOVO componente modal

// Definição da interface Jogador (DUPLICADA AQUI, conforme sua escolha)
export interface Jogador {
  id?: number;
  nome: string;
  idade?: number;
  nacionalidade?: string;
  posicao: string;
  clube: string;
  foto: string;
  numeroCamisa?: number;
  jogosSemSofrerGol?: number;
  mediaDefesas?: number;
  gols?: string;
  assistencias?: string;
  mediaCortes?: number;
  mediaInterceptacoes?: number;
  mapaCalor: string;
  // Adicione outras propriedades do seu JSON que possam ser relevantes para exibição ou filtro
}

@Component({
  selector: 'jogador-list',
  standalone: true,
  // Adiciona JogadorDetalhesComponent aos imports
  imports: [CommonModule, HttpClientModule, JogadorFiltrosComponent, JogadorDetalhesComponent],
  templateUrl: './jogador-list.html',
  styleUrls: ['./jogador-list.css']
})
export class JogadorList implements OnInit {
  jogadores: Jogador[] = [];
  jogadoresOriginal: Jogador[] = [];

  nacionalidadesDisponiveis: string[] = [];
  posicoesDisponiveis: string[] = [];
  clubesDisponiveis: string[] = [];

  // PROPRIEDADES PARA O MODAL DE DETALHES
  showDetalhesModal: boolean = false;
  jogadorSelecionado: Jogador | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/jogadores')
      .subscribe({
        next: (res) => {
          if (Array.isArray(res)) {
            this.jogadoresOriginal = res;
          } else if (res && Array.isArray(res.jogadores)) {
            this.jogadoresOriginal = res.jogadores;
          } else {
            console.error('Formato de resposta da API inesperado:', res);
            this.jogadoresOriginal = [];
          }

          this.jogadores = [...this.jogadoresOriginal];
          this.extrairOpcoesFiltro(this.jogadoresOriginal);
          console.log('Jogadores carregados (Original):', this.jogadoresOriginal);
          console.log('Nacionalidades disponíveis:', this.nacionalidadesDisponiveis);
          console.log('Posições disponíveis:', this.posicoesDisponiveis);
          console.log('Clubes disponíveis:', this.clubesDisponiveis);
        },
        error: (err) => console.error('Erro ao carregar jogadores:', err)
      });
  }

  private extrairOpcoesFiltro(jogadores: Jogador[]): void {
    const nacionalidades = new Set<string>();
    const posicoes = new Set<string>();
    const clubes = new Set<string>();

    jogadores.forEach(jogador => {
      if (jogador.nacionalidade) {
        nacionalidades.add(jogador.nacionalidade);
      }
      if (jogador.posicao) {
        posicoes.add(jogador.posicao);
      }
      if (jogador.clube) {
        clubes.add(jogador.clube);
      }
    });

    this.nacionalidadesDisponiveis = Array.from(nacionalidades).sort();
    this.posicoesDisponiveis = Array.from(posicoes).sort();
    this.clubesDisponiveis = Array.from(clubes).sort();
  }

  aplicarFiltros(filtros: JogadorFiltros): void {
    let jogadoresFiltrados = [...this.jogadoresOriginal];

    if (filtros.nome) {
      const nomeLower = filtros.nome.toLowerCase();
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
        jogador.nome.toLowerCase().includes(nomeLower)
      );
    }

    if (filtros.nacionalidade) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
        jogador.nacionalidade === filtros.nacionalidade
      );
    }

    if (filtros.posicao) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
        jogador.posicao === filtros.posicao
      );
    }

    if (filtros.clube) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
        jogador.clube === filtros.clube
      );
    }

    this.jogadores = jogadoresFiltrados;
    console.log('Filtros aplicados:', filtros);
    console.log('Jogadores filtrados:', this.jogadores);
  }

  // NOVOS MÉTODOS PARA CONTROLAR O MODAL DE DETALHES
  openDetalhesModal(jogador: Jogador): void {
    this.jogadorSelecionado = jogador; // Atribui o jogador clicado à propriedade
    this.showDetalhesModal = true; // Define como true para exibir o modal
  }

  closeDetalhesModal(): void {
    this.showDetalhesModal = false; // Define como false para esconder o modal
    this.jogadorSelecionado = null; // Limpa o jogador selecionado
  }
}
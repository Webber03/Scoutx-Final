// src/app/components/jogador-list/jogador-list.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { JogadorFiltros, JogadorFiltrosComponent } from '../jogador-filtros/jogador-filtros';
import { JogadorDetalhesComponent } from '../jogador-detalhes/jogador-detalhes';
import { JogadorCompararComponent } from '../jogador-comparar/jogador-comparar'; // Importar o novo componente

// Re-exportar a interface Jogador para ser usada em outros componentes
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
  gols?: number;
  assistencias?: number;
  mediaCortes?: number;
  mediaInterceptacoes?: number;
  mapaCalor: string;
  nota?: number;
  peDominante?: string;
  altura?: number;
  valorMercado?: number;
}

@Component({
  selector: 'jogador-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, // Adicionar FormsModule aqui
    JogadorFiltrosComponent,
    JogadorDetalhesComponent,
    JogadorCompararComponent // Adicionar o novo componente aqui
  ],
  templateUrl: './jogador-list.html',
  styleUrls: ['./jogador-list.css']
})
export class JogadorList implements OnInit {
  jogadores: Jogador[] = [];
  jogadoresOriginal: Jogador[] = [];

  nacionalidadesDisponiveis: string[] = [];
  posicoesDisponiveis: string[] = [];
  clubesDisponiveis: string[] = [];

  showDetalhesModal: boolean = false;
  jogadorSelecionado: Jogador | null = null;

  // NOVAS PROPRIEDADES PARA COMPARAÇÃO
  jogadoresParaComparar: Jogador[] = [];
  showComparacaoModal: boolean = false;

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
            this.jogadoresOriginal = [];
          }

          this.jogadoresOriginal = this.jogadoresOriginal.map(jogador => ({
            ...jogador,
            gols: typeof jogador.gols === 'string' ? parseInt(jogador.gols, 10) : (jogador.gols as number | undefined),
            assistencias: typeof jogador.assistencias === 'string' ? parseInt(jogador.assistencias, 10) : (jogador.assistencias as number | undefined),
            nota: typeof jogador.nota === 'string' ? parseFloat(jogador.nota) : (jogador.nota as number | undefined),
            altura: typeof jogador.altura === 'string' ? parseFloat(jogador.altura) : (jogador.altura as number | undefined),
            valorMercado: typeof jogador.valorMercado === 'string' ? parseFloat(jogador.valorMercado) : (jogador.valorMercado as number | undefined)
          }));

          this.jogadores = [...this.jogadoresOriginal];
          this.extrairOpcoesFiltro(this.jogadoresOriginal);
        },
        error: (err) => {
          console.error('Erro ao carregar jogadores:', err);
        }
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

    if (filtros.idade) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        if (jogador.idade === undefined || jogador.idade === null) return false;
        const idade = jogador.idade;
        switch (filtros.idade) {
          case '15-20': return idade >= 15 && idade <= 20;
          case '20-25': return idade >= 20 && idade <= 25;
          case '25-30': return idade >= 25 && idade <= 30;
          case '30+': return idade >= 30;
          default: return true;
        }
      });
    }

    if (filtros.gols) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        const gols = typeof jogador.gols === 'number' ? jogador.gols : 0;
        switch (filtros.gols) {
          case '0-5': return gols >= 0 && gols <= 5;
          case '5-10': return gols >= 5 && gols <= 10;
          case '10-20': return gols >= 10 && gols <= 20;
          case '20+': return gols >= 20;
          default: return true;
        }
      });
    }

    if (filtros.assistencias) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        const assistencias = typeof jogador.assistencias === 'number' ? jogador.assistencias : 0;
        switch (filtros.assistencias) {
          case '0-5': return assistencias >= 0 && assistencias <= 5;
          case '5-10': return assistencias >= 5 && assistencias <= 10;
          case '10-20': return assistencias >= 10 && assistencias >= 20;
          case '20+': return assistencias >= 20;
          default: return true;
        }
      });
    }

    if (filtros.nota) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        if (jogador.nota === undefined || jogador.nota === null) return false;
        const nota = jogador.nota;
        const [minStr, maxStr] = filtros.nota!.split('-');
        const min = parseFloat(minStr);
        const max = maxStr ? parseFloat(maxStr) : Infinity;
        return nota >= min && nota <= max;
      });
    }

    if (filtros.peDominante) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
        jogador.peDominante === filtros.peDominante
      );
    }

    if (filtros.altura) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        if (jogador.altura === undefined || jogador.altura === null) return false;
        const altura = jogador.altura;
        const [minStr, maxStr] = filtros.altura!.replace('m', '').split('-');
        const min = parseFloat(minStr);
        const max = maxStr ? parseFloat(maxStr) : Infinity;
        return altura >= min && altura <= max;
      });
    }

    if (filtros.numeroCamisa) {
      const numeroCamisaFiltro = parseInt(filtros.numeroCamisa, 10);
      if (!isNaN(numeroCamisaFiltro)) {
        jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
          jogador.numeroCamisa === numeroCamisaFiltro
        );
      }
    }

    if (filtros.valorMercado) {
      jogadoresFiltrados = jogadoresFiltrados.filter(jogador => {
        if (jogador.valorMercado === undefined || jogador.valorMercado === null) return false;
        const valor = jogador.valorMercado;
        const [minStr, maxStr] = filtros.valorMercado!.replace('M', '').split('-');
        const min = parseFloat(minStr);
        const max = maxStr ? parseFloat(maxStr) : Infinity;
        return valor >= min && valor <= max;
      });
    }

    this.jogadores = jogadoresFiltrados;
  }

  openDetalhesModal(jogador: Jogador): void {
    this.jogadorSelecionado = jogador;
    this.showDetalhesModal = true;
  }

  closeDetalhesModal(): void {
    this.showDetalhesModal = false;
    this.jogadorSelecionado = null;
  }

  // NOVOS MÉTODOS PARA COMPARAÇÃO
  toggleComparacao(jogador: Jogador): void {
    const index = this.jogadoresParaComparar.findIndex(j => j.id === jogador.id);

    if (index > -1) {
      // Jogador já selecionado, remover
      this.jogadoresParaComparar.splice(index, 1);
    } else {
      // Jogador não selecionado, adicionar se houver espaço
      if (this.jogadoresParaComparar.length < 2) { // Limite de 2 jogadores para comparação
        this.jogadoresParaComparar.push(jogador);
      } else {
        alert('Você pode comparar no máximo 2 jogadores por vez. Desmarque um jogador para selecionar outro.');
      }
    }
  }

  isJogadorSelecionadoParaComparacao(jogador: Jogador): boolean {
    return this.jogadoresParaComparar.some(j => j.id === jogador.id);
  }

  openComparacaoModal(): void {
    if (this.jogadoresParaComparar.length === 2) {
      this.showComparacaoModal = true;
    } else {
      alert('Selecione exatamente 2 jogadores para comparar.');
    }
  }

  closeComparacaoModal(): void {
    this.showComparacaoModal = false;
    this.jogadoresParaComparar = []; // Limpa a seleção após fechar o modal
  }
}
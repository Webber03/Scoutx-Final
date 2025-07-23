import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface JogadorFiltros {
  nacionalidade: string | null;
  posicao: string | null;
  clube: string | null;
  nome: string | null;
  idade: string | null;
  gols: string | null;
  assistencias: string | null;
  nota: string | null; // Alterado de 'rating' para 'nota'
  peDominante: string | null;
  altura: string | null;
  numeroCamisa: string | null;
  valorMercado: string | null;
}

@Component({
  selector: 'app-jogador-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogador-filtros.html',
  styleUrls: ['./jogador-filtros.css']
})
export class JogadorFiltrosComponent implements OnInit {
  nacionalidadeSelecionada: string = '';
  posicaoSelecionada: string = '';
  clubeSelecionado: string = '';
  nomeBuscado: string = '';
  idadeSelecionada: string = '';
  golsSelecionados: string = '';
  assistenciasSelecionadas: string = '';
  notaSelecionada: string = ''; // Alterado de 'ratingSelecionado' para 'notaSelecionada'
  peDominanteSelecionado: string = '';
  alturaSelecionada: string = '';
  numeroCamisaBuscado: string = '';
  valorMercadoSelecionado: string = '';

  @Input() nacionalidadesDisponiveis: string[] = [];
  @Input() posicoesDisponiveis: string[] = [];
  @Input() clubesDisponiveis: string[] = [];

  faixasIdadeDisponiveis: string[] = ['15-20', '20-25', '25-30', '30+'];
  faixasGolsDisponiveis: string[] = ['0-5', '5-10', '10-20', '20+'];
  faixasAssistenciasDisponiveis: string[] = ['0-5', '5-10', '10-20', '20+'];

  faixasNotaDisponiveis: string[] = ['6.0-7.0', '7.0-7.5', '7.5-8.0', '8.0-8.5', '8.5-9.0', '9.0+']; // Alterado para 'faixasNotaDisponiveis'
  pesDominantesDisponiveis: string[] = ['Direito', 'Esquerdo'];
  faixasAlturaDisponiveis: string[] = ['1.60m-1.70m', '1.70m-1.80m', '1.80m-1.90m', '1.90m+'];
  faixasValorMercadoDisponiveis: string[] = ['0-5M', '5M-10M', '10M-20M', '20M-50M', '50M-100M', '100M+'];


  @Output() filtrosAplicados = new EventEmitter<JogadorFiltros>();

  mostrarMaisFiltros: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.nacionalidadesDisponiveis.sort();
    this.posicoesDisponiveis.sort();
    this.clubesDisponiveis.sort();
  }

  aplicarFiltros(): void {
    this.filtrosAplicados.emit({
      nacionalidade: this.nacionalidadeSelecionada || null,
      posicao: this.posicaoSelecionada || null,
      clube: this.clubeSelecionado || null,
      nome: this.nomeBuscado || null,
      idade: this.idadeSelecionada || null,
      gols: this.golsSelecionados || null,
      assistencias: this.assistenciasSelecionadas || null,
      nota: this.notaSelecionada || null, // Alterado para 'nota'
      peDominante: this.peDominanteSelecionado || null,
      altura: this.alturaSelecionada || null,
      numeroCamisa: this.numeroCamisaBuscado || null,
      valorMercado: this.valorMercadoSelecionado || null
    });
  }

  limparFiltros(): void {
    this.nomeBuscado = '';
    this.nacionalidadeSelecionada = '';
    this.posicaoSelecionada = '';
    this.clubeSelecionado = '';
    this.idadeSelecionada = '';
    this.golsSelecionados = '';
    this.assistenciasSelecionadas = '';
    this.notaSelecionada = ''; // Limpa 'nota'
    this.peDominanteSelecionado = '';
    this.alturaSelecionada = '';
    this.numeroCamisaBuscado = '';
    this.valorMercadoSelecionado = '';
    this.aplicarFiltros();
  }

  toggleMaisFiltros(): void {
    this.mostrarMaisFiltros = !this.mostrarMaisFiltros;
  }
}
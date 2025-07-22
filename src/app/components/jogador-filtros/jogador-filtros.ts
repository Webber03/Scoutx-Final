// src/app/components/jogador-filtros/jogador-filtros.component.ts
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos uma interface para o formato dos filtros que serão emitidos
export interface JogadorFiltros {
  nacionalidade: string | null;
  posicao: string | null;
  clube: string | null;
  nome: string | null; // Adicionamos filtro por nome
}

@Component({
  selector: 'app-jogador-filtros', // O seletor que você usará no HTML do JogadorListComponent
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogador-filtros.html',
  styleUrls: ['./jogador-filtros.css']
})
export class JogadorFiltrosComponent implements OnInit {
  // Propriedades para os valores selecionados nos filtros
  nacionalidadeSelecionada: string = '';
  posicaoSelecionada: string = '';
  clubeSelecionado: string = '';
  nomeBuscado: string = ''; // Novo filtro por nome

  // NEW: Receber as listas de opções do componente pai (JogadorListComponent)
  @Input() nacionalidadesDisponiveis: string[] = [];
  @Input() posicoesDisponiveis: string[] = [];
  @Input() clubesDisponiveis: string[] = [];

  // Event emitter para enviar os filtros aplicados para o componente pai
  @Output() filtrosAplicados = new EventEmitter<JogadorFiltros>();

  constructor() { }

  ngOnInit(): void {
    // Ordena as listas de opções
    this.nacionalidadesDisponiveis.sort();
    this.posicoesDisponiveis.sort();
    this.clubesDisponiveis.sort();
  }

  aplicarFiltros(): void {
    // Emite um objeto com os valores atuais dos filtros
    this.filtrosAplicados.emit({
      nacionalidade: this.nacionalidadeSelecionada || null, // null se vazio
      posicao: this.posicaoSelecionada || null,             // null se vazio
      clube: this.clubeSelecionado || null,                 // null se vazio
      nome: this.nomeBuscado || null                      // null se vazio
    });
  }

  limparFiltros(): void {
    this.nacionalidadeSelecionada = '';
    this.posicaoSelecionada = '';
    this.clubeSelecionado = '';
    this.nomeBuscado = '';
    this.aplicarFiltros(); // Emite filtros vazios para resetar a lista no pai
  }
}
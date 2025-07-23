// src/app/components/jogador-detalhes/jogador-detalhes.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf, DecimalPipe } from '@angular/common';

// Definição da interface Jogador - AGORA CONSISTENTE COM JOGADOR-LIST.TS
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
  // ESTES CAMPOS DEVEM SER 'number' PARA CORRESPONDER AO QUE É PASSADO DE JOGADOR-LIST.TS
  gols?: number;         // <-- CORRIGIDO para 'number'
  assistencias?: number; // <-- CORRIGIDO para 'number'
  mediaCortes?: number;
  mediaInterceptacoes?: number;
  mapaCalor: string;
  nota?: number;         // Adicionado e tipado como number
  peDominante?: string;  // Adicionado
  altura?: number;       // Adicionado e tipado como number
  valorMercado?: number; // Adicionado e tipado como number
}

@Component({
  selector: 'app-jogador-detalhes', // Seu seletor
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, DecimalPipe], // Adicionado explicitamente
  templateUrl: './jogador-detalhes.html',
  styleUrls: ['./jogador-detalhes.css']
})
export class JogadorDetalhesComponent implements OnInit {
  @Input() jogador: Jogador | null = null; // Recebe o objeto jogador completo
  // MUITO IMPORTANTE: O @Output() DEVE SER 'fechar'
  @Output() fechar = new EventEmitter<void>(); // <-- CORRIGIDO para 'fechar'

  constructor() {}

  ngOnInit(): void {
    console.log('Dados do Jogador recebidos no Modal:', this.jogador); // Para depuração
  }

  // Método para fechar o modal
  closeModal(): void {
    this.fechar.emit(); // Emite o evento para o componente pai
  }
}
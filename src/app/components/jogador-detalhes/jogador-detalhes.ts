// src/app/components/jogador-detalhes/jogador-detalhes.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf, DecimalPipe } from '@angular/common'; // Inclui DecimalPipe para formatação de números

// Definição da interface Jogador (agora inline, baseada no seu db.json)
export interface Jogador {
  id?: number; // Alterado para 'id' e para tipo 'number' conforme seu JSON
  nome: string;
  idade?: number;
  nacionalidade?: string;
  posicao: string;
  clube: string;
  foto: string;
  numeroCamisa?: number;
  // Estatísticas condicionais (marcadas como opcionais)
  jogosSemSofrerGol?: number; // Para goleiros
  mediaDefesas?: number;      // Para goleiros
  gols?: string;              // Para atacantes/meias (mantido como string conforme seu JSON)
  assistencias?: string;      // Para atacantes/meias (mantido como string conforme seu JSON)
  mediaCortes?: number;       // Para zagueiros/volantes
  mediaInterceptacoes?: number; // Para zagueiros/volantes
  mapaCalor: string;
  // Adicione aqui outras propriedades se tiver mais no seu db.json que queira exibir
}

@Component({
  selector: 'app-jogador-detalhes', // Seu seletor
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, DecimalPipe], // Adicionado NgIf, NgForOf e DecimalPipe explicitamente
  templateUrl: './jogador-detalhes.html',
  styleUrls: ['./jogador-detalhes.css']
})
export class JogadorDetalhesComponent implements OnInit {
  @Input() jogador: Jogador | null = null; // Recebe o objeto jogador completo
  @Output() close = new EventEmitter<void>(); // Emite evento quando o modal deve fechar

  constructor() {}

  ngOnInit(): void {
    console.log('Dados do Jogador recebidos no Modal:', this.jogador); // Para depuração
  }

  // Método para fechar o modal
  closeModal(): void {
    this.close.emit(); // Emite o evento para o componente pai
  }
}
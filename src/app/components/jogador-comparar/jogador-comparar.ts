// src/app/components/jogador-comparar/jogador-comparar.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf, DecimalPipe } from '@angular/common'; // Importa CommonModule e outros pipes/diretivas
import { Jogador } from '../jogador-list/jogador-list'; // Importa a interface Jogador

@Component({
  selector: 'app-jogador-comparar', // Certifique-se que o seletor está correto
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,      // Usado para *ngFor se você for iterar sobre algo
    NgIf,         // Usado para *ngIf
    DecimalPipe   // Usado para formatar números
  ],
  templateUrl: './jogador-comparar.html',
  styleUrls: ['./jogador-comparar.css']
})
export class JogadorCompararComponent implements OnInit {
  // Receberá a lista de 2 jogadores para comparar
  @Input() jogadores: Jogador[] = [];

  // Evento para fechar o modal, assim como no JogadorDetalhes
  @Output() fechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    // Para depuração: verificar quais jogadores foram recebidos
    console.log('Jogadores para comparar recebidos:', this.jogadores);
  }

  // Método para emitir o evento de fechar
  closeModal(): void {
    this.fechar.emit();
  }
}
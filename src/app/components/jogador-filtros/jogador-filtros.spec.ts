import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorFiltros } from './jogador-filtros';

describe('JogadorFiltros', () => {
  let component: JogadorFiltros;
  let fixture: ComponentFixture<JogadorFiltros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorFiltros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorFiltros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorDetalhes } from './jogador-detalhes';

describe('JogadorDetalhes', () => {
  let component: JogadorDetalhes;
  let fixture: ComponentFixture<JogadorDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorComparar } from './jogador-comparar';

describe('JogadorComparar', () => {
  let component: JogadorComparar;
  let fixture: ComponentFixture<JogadorComparar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorComparar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorComparar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

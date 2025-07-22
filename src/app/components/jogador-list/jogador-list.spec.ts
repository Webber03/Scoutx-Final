import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorList } from './jogador-list';

describe('JogadorList', () => {
  let component: JogadorList;
  let fixture: ComponentFixture<JogadorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

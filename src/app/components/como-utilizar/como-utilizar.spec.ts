import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoUtilizar } from './como-utilizar';

describe('ComoUtilizar', () => {
  let component: ComoUtilizar;
  let fixture: ComponentFixture<ComoUtilizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoUtilizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComoUtilizar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

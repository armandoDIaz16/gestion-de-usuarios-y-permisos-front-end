import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSinFormalizarComponent } from './pago_sin_formalizar.component';

describe('PagoSinFormalizarComponent', () => {
  let component: PagoSinFormalizarComponent;
  let fixture: ComponentFixture<PagoSinFormalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoSinFormalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSinFormalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinPagoRegistradoComponent } from './sin_pago_registrado.component';

describe('SinPagoRegistradoComponent', () => {
  let component: SinPagoRegistradoComponent;
  let fixture: ComponentFixture<SinPagoRegistradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinPagoRegistradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinPagoRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

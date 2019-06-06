import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configuracion_actaComponent } from './configuracion_acta.component';

describe('Configuracion_actaComponent', () => {
  let component: Configuracion_actaComponent;
  let fixture: ComponentFixture<Configuracion_actaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configuracion_actaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configuracion_actaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

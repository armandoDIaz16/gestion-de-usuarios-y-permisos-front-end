import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Informacion_residenciasComponent } from './informacion_residencias.component';

describe('Informacion_residenciasComponent', () => {
  let component: Informacion_residenciasComponent;
  let fixture: ComponentFixture<Informacion_residenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Informacion_residenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Informacion_residenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

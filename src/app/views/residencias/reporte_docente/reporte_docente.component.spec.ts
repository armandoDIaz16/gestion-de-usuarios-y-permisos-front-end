import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte_docenteComponent } from './reporte_docente.component';

describe('Reporte_docenteComponent', () => {
  let component: Reporte_docenteComponent;
  let fixture: ComponentFixture<Reporte_docenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reporte_docenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte_docenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

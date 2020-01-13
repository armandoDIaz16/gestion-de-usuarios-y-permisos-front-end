import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEncuestaComponent } from './reporte-encuesta.component';

describe('ReporteEncuestaComponent', () => {
  let component: ReporteEncuestaComponent;
  let fixture: ComponentFixture<ReporteEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

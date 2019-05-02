import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVistaComponent } from './reporte_vista.component';

describe('ReporteVistaComponent', () => {
  let component: ReporteVistaComponent;
  let fixture: ComponentFixture<ReporteVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

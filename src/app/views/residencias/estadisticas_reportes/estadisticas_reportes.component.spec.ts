import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadisticas_reportesComponent } from './estadisticas_reportes.component';

describe('Estadisticas_reportesComponent', () => {
  let component: Estadisticas_reportesComponent;
  let fixture: ComponentFixture<Estadisticas_reportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Estadisticas_reportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Estadisticas_reportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

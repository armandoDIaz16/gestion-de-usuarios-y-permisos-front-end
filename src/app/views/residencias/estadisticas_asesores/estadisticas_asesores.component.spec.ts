import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadisticas_asesoresComponent } from './estadisticas_asesores.component';

describe('Estadisticas_asesoresComponent', () => {
  let component: Estadisticas_asesoresComponent;
  let fixture: ComponentFixture<Estadisticas_asesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Estadisticas_asesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Estadisticas_asesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

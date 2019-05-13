import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calificacion_alumnoComponent } from './calificacion_alumno.component';

describe('Calificacion_alumnoComponent', () => {
  let component: Calificacion_alumnoComponent;
  let fixture: ComponentFixture<Calificacion_alumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calificacion_alumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calificacion_alumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

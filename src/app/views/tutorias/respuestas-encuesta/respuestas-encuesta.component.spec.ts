import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasEncuestaComponent } from './respuestas-encuesta.component';

describe('RespuestasEncuestaComponent', () => {
  let component: RespuestasEncuestaComponent;
  let fixture: ComponentFixture<RespuestasEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenUbicacionComponent } from './examen_ubicacion.component';

describe('ExamenUbicacionComponent', () => {
  let component: ExamenUbicacionComponent;
  let fixture: ComponentFixture<ExamenUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

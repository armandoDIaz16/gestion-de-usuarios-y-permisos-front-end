import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalizacionesAlumnoComponent } from './canalizaciones-alumno.component';

describe('CanalizacionesAlumnoComponent', () => {
  let component: CanalizacionesAlumnoComponent;
  let fixture: ComponentFixture<CanalizacionesAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanalizacionesAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalizacionesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

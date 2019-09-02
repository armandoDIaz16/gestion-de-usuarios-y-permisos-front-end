import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAlumnoComponent } from './citas-alumno.component';

describe('CitasAlumnoComponent', () => {
  let component: CitasAlumnoComponent;
  let fixture: ComponentFixture<CitasAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

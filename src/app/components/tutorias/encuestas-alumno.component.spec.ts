import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasAlumnoComponent } from './encuestas-alumno.component';

describe('EncuestasAlumnoComponent', () => {
  let component: EncuestasAlumnoComponent;
  let fixture: ComponentFixture<EncuestasAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

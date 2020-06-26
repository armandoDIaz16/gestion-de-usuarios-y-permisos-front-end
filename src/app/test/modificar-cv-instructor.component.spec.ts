import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCvInstructorComponent } from '../components/capacitacion_docente/modificar-cv-instructor.component';

describe('ModificarCvInstructorComponent', () => {
  let component: ModificarCvInstructorComponent;
  let fixture: ComponentFixture<ModificarCvInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCvInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCvInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

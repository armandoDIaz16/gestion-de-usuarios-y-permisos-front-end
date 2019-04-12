import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form_alumnoComponent } from './form_alumno.component';

describe('AceptadosComponent', () => {
  let component: Form_alumnoComponent;
  let fixture: ComponentFixture<Form_alumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_alumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_alumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

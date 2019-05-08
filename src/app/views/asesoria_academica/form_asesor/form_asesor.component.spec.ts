import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form_asesorComponent } from './form_asesor.component';

describe('AceptadosComponent', () => {
  let component: Form_asesorComponent;
  let fixture: ComponentFixture<Form_asesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_asesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_asesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

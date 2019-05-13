import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Informe_tecnicoComponent } from './informe_tecnico.component';

describe('Informe_tecnicoComponent', () => {
  let component: Informe_tecnicoComponent;
  let fixture: ComponentFixture<Informe_tecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Informe_tecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Informe_tecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco_seleccionComponent } from './banco_seleccion.component';

describe('Banco_seleccionComponent', () => {
  let component: Banco_seleccionComponent;
  let fixture: ComponentFixture<Banco_seleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco_seleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco_seleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

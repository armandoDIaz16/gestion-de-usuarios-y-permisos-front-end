import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Usuarios_tutoriasComponent } from './usuarios_tutorias.component';

describe('UsuariosComponent', () => {
  let component: Usuarios_tutoriasComponent;
  let fixture: ComponentFixture<Usuarios_tutoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usuarios_tutoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Usuarios_tutoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

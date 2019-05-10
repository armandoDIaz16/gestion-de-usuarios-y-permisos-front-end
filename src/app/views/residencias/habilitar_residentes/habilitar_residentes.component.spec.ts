import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Habilitar_residentesComponent } from './habilitar_residentes.component';

describe('Habilitar_residentesComponent', () => {
  let component: Habilitar_residentesComponent;
  let fixture: ComponentFixture<Habilitar_residentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Habilitar_residentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Habilitar_residentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUnicaAsignacionComponent } from './ficha_unica_asignacion.component';

describe('Ficha_unica_asignacionComponent', () => {
  let component: FichaUnicaAsignacionComponent;
  let fixture: ComponentFixture<FichaUnicaAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaUnicaAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaUnicaAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

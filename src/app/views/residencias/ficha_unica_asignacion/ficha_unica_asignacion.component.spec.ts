import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha_unica_asignacionComponent } from './ficha_unica_asignacion.component';

describe('Ficha_unica_asignacionComponent', () => {
  let component: Ficha_unica_asignacionComponent;
  let fixture: ComponentFixture<Ficha_unica_asignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ficha_unica_asignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ficha_unica_asignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

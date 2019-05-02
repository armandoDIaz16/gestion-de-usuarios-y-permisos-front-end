import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco_aprobacionComponent } from './banco_aprobacion.component';

describe('Banco_aprobacionComponent', () => {
  let component: Banco_aprobacionComponent;
  let fixture: ComponentFixture<Banco_aprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco_aprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco_aprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

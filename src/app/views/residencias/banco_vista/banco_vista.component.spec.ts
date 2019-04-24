import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco_vistaComponent } from './banco_vista.component';

describe('Banco_vistaComponent', () => {
  let component: Banco_vistaComponent;
  let fixture: ComponentFixture<Banco_vistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco_vistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco_vistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

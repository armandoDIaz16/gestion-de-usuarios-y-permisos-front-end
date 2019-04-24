import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco_edicionComponent } from './banco_edicion.component';

describe('Banco_edicionComponent', () => {
  let component: Banco_edicionComponent;
  let fixture: ComponentFixture<Banco_edicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco_edicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco_edicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

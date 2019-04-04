import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenciaDePagosComponent } from './vigencia_de_pagos.component';

describe('VigenciaDePagosComponent', () => {
  let component: VigenciaDePagosComponent;
  let fixture: ComponentFixture<VigenciaDePagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigenciaDePagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigenciaDePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosPagosComponent } from './archivos_pagos.component';

describe('ArchivosPagosComponent', () => {
  let component: ArchivosPagosComponent;
  let fixture: ComponentFixture<ArchivosPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

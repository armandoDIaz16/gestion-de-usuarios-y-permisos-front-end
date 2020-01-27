import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasPagadasComponent } from './referencias_pagadas.component';

describe('ReferenciasPagadasComponent', () => {
  let component: ReferenciasPagadasComponent;
  let fixture: ComponentFixture<ReferenciasPagadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciasPagadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciasPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

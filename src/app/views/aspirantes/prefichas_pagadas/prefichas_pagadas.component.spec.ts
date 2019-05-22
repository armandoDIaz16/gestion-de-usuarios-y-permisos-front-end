import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefichasPagadasComponent } from './prefichas_pagadas.component';

describe('PrefichasPagadasComponent', () => {
  let component: PrefichasPagadasComponent;
  let fixture: ComponentFixture<PrefichasPagadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefichasPagadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefichasPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

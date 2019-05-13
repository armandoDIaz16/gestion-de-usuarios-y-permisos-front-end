import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefichasComponent } from './prefichas.component';

describe('PrefichasComponent', () => {
  let component: PrefichasComponent;
  let fixture: ComponentFixture<PrefichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

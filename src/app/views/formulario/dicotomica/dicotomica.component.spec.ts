import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicotomicaComponent } from './dicotomica.component';

describe('DicotomicaComponent', () => {
  let component: DicotomicaComponent;
  let fixture: ComponentFixture<DicotomicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicotomicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicotomicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

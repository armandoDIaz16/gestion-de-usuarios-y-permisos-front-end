import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTutorComponent } from './datos-tutor.component';

describe('DatosTutorComponent', () => {
  let component: DatosTutorComponent;
  let fixture: ComponentFixture<DatosTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

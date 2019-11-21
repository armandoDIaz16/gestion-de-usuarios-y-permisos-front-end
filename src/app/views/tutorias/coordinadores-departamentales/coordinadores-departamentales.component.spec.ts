import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadoresDepartamentalesComponent } from './coordinadores-departamentales.component';

describe('CoordinadoresDepartamentalesComponent', () => {
  let component: CoordinadoresDepartamentalesComponent;
  let fixture: ComponentFixture<CoordinadoresDepartamentalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadoresDepartamentalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadoresDepartamentalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

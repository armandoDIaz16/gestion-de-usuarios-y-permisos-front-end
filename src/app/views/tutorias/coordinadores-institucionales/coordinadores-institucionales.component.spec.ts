import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadoresInstitucionalesComponent } from './coordinadores-institucionales.component';

describe('CoordinadoresInstitucionalesComponent', () => {
  let component: CoordinadoresInstitucionalesComponent;
  let fixture: ComponentFixture<CoordinadoresInstitucionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadoresInstitucionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadoresInstitucionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

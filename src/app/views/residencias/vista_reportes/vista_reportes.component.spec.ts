import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vista_reportesComponent } from './vista_reportes.component';

describe('Vista_reportesComponent', () => {
  let component: Vista_reportesComponent;
  let fixture: ComponentFixture<Vista_reportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vista_reportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vista_reportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

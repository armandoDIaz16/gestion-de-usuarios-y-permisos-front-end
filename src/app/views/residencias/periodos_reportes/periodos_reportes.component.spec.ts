import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Periodos_reportesComponent } from './periodos_reportes.component';

describe('Periodos_reportesComponent', () => {
  let component: Periodos_reportesComponent;
  let fixture: ComponentFixture<Periodos_reportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Periodos_reportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Periodos_reportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

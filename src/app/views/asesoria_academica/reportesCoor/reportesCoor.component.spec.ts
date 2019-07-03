import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCoordComponent } from './reportesCoor.component';

describe('AceptadosComponent', () => {
  let component: ReportesCoordComponent;
  let fixture: ComponentFixture<ReportesCoordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesCoordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

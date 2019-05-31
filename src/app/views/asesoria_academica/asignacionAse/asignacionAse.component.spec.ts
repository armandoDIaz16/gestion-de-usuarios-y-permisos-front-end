import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionAseComponent } from './asignacionAse.component';

describe('AceptadosComponent', () => {
  let component: AsignacionAseComponent;
  let fixture: ComponentFixture<AsignacionAseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionAseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionAseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

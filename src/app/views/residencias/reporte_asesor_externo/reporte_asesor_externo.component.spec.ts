import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte_asesor_externoComponent } from './reporte_asesor_externo.component';

describe('Reporte_asesor_externoComponent', () => {
  let component: Reporte_asesor_externoComponent;
  let fixture: ComponentFixture<Reporte_asesor_externoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reporte_asesor_externoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte_asesor_externoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

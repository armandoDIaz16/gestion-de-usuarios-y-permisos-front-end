import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralidadesComponent } from './generalidades.component';

describe('AceptadosComponent', () => {
  let component: GeneralidadesComponent;
  let fixture: ComponentFixture<GeneralidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

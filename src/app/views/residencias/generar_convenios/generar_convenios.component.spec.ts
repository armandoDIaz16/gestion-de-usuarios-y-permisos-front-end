import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Generar_conveniosComponent } from './generar_convenios.component';

describe('Generar_conveniosComponent', () => {
  let component: Generar_conveniosComponent;
  let fixture: ComponentFixture<Generar_conveniosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generar_conveniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generar_conveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

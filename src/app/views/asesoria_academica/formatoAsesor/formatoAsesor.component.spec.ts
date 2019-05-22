import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoAsesorComponent } from './formatoAsesor.component';

describe('AceptadosComponent', () => {
  let component: FormatoAsesorComponent;
  let fixture: ComponentFixture<FormatoAsesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoAsesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

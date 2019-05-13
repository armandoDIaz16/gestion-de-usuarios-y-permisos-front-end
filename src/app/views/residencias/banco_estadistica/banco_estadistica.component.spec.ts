import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco_estadisticaComponent } from './banco_estadistica.component';

describe('Banco_estadisticaComponent', () => {
  let component: Banco_estadisticaComponent;
  let fixture: ComponentFixture<Banco_estadisticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco_estadisticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco_estadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstanciasComponent } from './constancias.component';

describe('AceptadosComponent', () => {
  let component: ConstanciasComponent;
  let fixture: ComponentFixture<ConstanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

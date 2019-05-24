import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasComponent } from './materias.component';

describe('AceptadosComponent', () => {
  let component: MateriasComponent;
  let fixture: ComponentFixture<MateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

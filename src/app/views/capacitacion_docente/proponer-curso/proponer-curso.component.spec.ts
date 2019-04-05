import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponerCursoComponent } from './proponer-curso.component';

describe('ProponerCursoComponent', () => {
  let component: ProponerCursoComponent;
  let fixture: ComponentFixture<ProponerCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProponerCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponerCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

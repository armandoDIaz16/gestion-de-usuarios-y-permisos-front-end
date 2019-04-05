import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponerCursoComponent } from './proponer_curso.component';

describe('Proponer_cursoComponent', () => {
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

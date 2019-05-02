import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vista_comentariosComponent } from './vista_comentarios.component';

describe('Vista_comentariosComponent', () => {
  let component: Vista_comentariosComponent;
  let fixture: ComponentFixture<Vista_comentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vista_comentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vista_comentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

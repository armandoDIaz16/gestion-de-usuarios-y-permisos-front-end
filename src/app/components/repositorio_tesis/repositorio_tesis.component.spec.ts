import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioTesisComponent } from './repositorio_tesis.component';

describe('RepositorioTesisComponent', () => {
  let component: RepositorioTesisComponent;
  let fixture: ComponentFixture<RepositorioTesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorioTesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

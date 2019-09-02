import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vista_de_documentacionComponent } from './vista_de_documentacion.component';

describe('Vista_de_documentacionComponent', () => {
  let component: Vista_de_documentacionComponent;
  let fixture: ComponentFixture<Vista_de_documentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vista_de_documentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vista_de_documentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

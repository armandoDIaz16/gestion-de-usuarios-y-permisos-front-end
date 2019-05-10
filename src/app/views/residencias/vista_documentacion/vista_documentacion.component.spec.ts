import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vista_documentacionComponent } from './vista_documentacion.component';

describe('Vista_documentacionComponent', () => {
  let component: Vista_documentacionComponent;
  let fixture: ComponentFixture<Vista_documentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vista_documentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vista_documentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

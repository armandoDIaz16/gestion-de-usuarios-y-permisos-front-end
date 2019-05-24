import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoAlmnoComponent } from './formatoAlmno.component';

describe('FormatoAlmnoComponent', () => {
  let component: FormatoAlmnoComponent;
  let fixture: ComponentFixture<FormatoAlmnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoAlmnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoAlmnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

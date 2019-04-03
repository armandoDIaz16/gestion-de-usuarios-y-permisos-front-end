import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoproyectosComponent } from './bancoproyectos.component';

describe('BancoproyectosComponent', () => {
  let component: BancoproyectosComponent;
  let fixture: ComponentFixture<BancoproyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoproyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

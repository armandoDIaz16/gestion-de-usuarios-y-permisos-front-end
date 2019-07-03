import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesAsesComponent } from './notificacionesAses.component';

describe('AceptadosComponent', () => {
  let component: NotificacionesAsesComponent;
  let fixture: ComponentFixture<NotificacionesAsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesAsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesAsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

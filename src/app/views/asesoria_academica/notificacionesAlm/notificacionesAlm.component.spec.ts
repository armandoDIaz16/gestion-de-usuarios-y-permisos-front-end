import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesAlmComponent } from './notificacionesAlm.component';

describe('AceptadosComponent', () => {
  let component: NotificacionesAlmComponent;
  let fixture: ComponentFixture<NotificacionesAlmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesAlmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesAlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

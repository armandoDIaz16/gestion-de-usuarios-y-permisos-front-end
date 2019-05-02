import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasCarruselComponent } from './noticias-carrusel.component';

describe('NoticiasCarruselComponent', () => {
  let component: NoticiasCarruselComponent;
  let fixture: ComponentFixture<NoticiasCarruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasCarruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

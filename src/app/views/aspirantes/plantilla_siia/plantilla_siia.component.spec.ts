import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantillaSIIAComponent } from './plantilla_siia.component';

describe('PlantillaSIIAComponent', () => {
  let component: PlantillaSIIAComponent;
  let fixture: ComponentFixture<PlantillaSIIAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaSIIAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSIIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

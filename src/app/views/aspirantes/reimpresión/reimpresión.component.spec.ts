import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimpresiónComponent } from './reimpresión.component';

describe('ReimpresiónComponent', () => {
  let component: ReimpresiónComponent;
  let fixture: ComponentFixture<ReimpresiónComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimpresiónComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimpresiónComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

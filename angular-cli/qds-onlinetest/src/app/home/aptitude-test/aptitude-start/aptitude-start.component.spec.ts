import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptitudeStartComponent } from './aptitude-start.component';

describe('AptitudeStartComponent', () => {
  let component: AptitudeStartComponent;
  let fixture: ComponentFixture<AptitudeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptitudeStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptitudeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

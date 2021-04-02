import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicStartComponent } from './toeic-start.component';

describe('ToeicStartComponent', () => {
  let component: ToeicStartComponent;
  let fixture: ComponentFixture<ToeicStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToeicStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeicStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

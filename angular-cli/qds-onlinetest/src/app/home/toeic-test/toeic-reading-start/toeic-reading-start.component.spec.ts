import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicReadingStartComponent } from './toeic-reading-start.component';

describe('ToeicReadingStartComponent', () => {
  let component: ToeicReadingStartComponent;
  let fixture: ComponentFixture<ToeicReadingStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToeicReadingStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeicReadingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicReadingMainComponent } from './toeic-reading-main.component';

describe('ToeicReadingMainComponent', () => {
  let component: ToeicReadingMainComponent;
  let fixture: ComponentFixture<ToeicReadingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToeicReadingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeicReadingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

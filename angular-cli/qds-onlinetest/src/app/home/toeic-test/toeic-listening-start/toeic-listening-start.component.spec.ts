import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicListeningStartComponent } from './toeic-listening-start.component';

describe('ToeicListeningStartComponent', () => {
  let component: ToeicListeningStartComponent;
  let fixture: ComponentFixture<ToeicListeningStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToeicListeningStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeicListeningStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

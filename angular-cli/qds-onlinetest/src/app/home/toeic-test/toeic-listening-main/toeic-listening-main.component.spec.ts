import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicListeningMainComponent } from './toeic-listening-main.component';

describe('ToeicListeningMainComponent', () => {
  let component: ToeicListeningMainComponent;
  let fixture: ComponentFixture<ToeicListeningMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToeicListeningMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeicListeningMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

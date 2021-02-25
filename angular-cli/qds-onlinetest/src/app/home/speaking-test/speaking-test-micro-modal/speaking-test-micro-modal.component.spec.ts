import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingTestMicroModalComponent } from './speaking-test-micro-modal.component';

describe('SpeakingTestMicroModalComponent', () => {
  let component: SpeakingTestMicroModalComponent;
  let fixture: ComponentFixture<SpeakingTestMicroModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingTestMicroModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingTestMicroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

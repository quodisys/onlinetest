import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingResultComponent } from './speaking-result.component';

describe('SpeakingResultComponent', () => {
  let component: SpeakingResultComponent;
  let fixture: ComponentFixture<SpeakingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

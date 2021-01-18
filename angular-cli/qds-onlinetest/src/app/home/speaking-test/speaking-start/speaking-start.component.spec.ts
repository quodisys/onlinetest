import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingStartComponent } from './speaking-start.component';

describe('SpeakingStartComponent', () => {
  let component: SpeakingStartComponent;
  let fixture: ComponentFixture<SpeakingStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

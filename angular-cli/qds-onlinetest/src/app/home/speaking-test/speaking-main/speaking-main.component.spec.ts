import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingMainComponent } from './speaking-main.component';

describe('SpeakingMainComponent', () => {
  let component: SpeakingMainComponent;
  let fixture: ComponentFixture<SpeakingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

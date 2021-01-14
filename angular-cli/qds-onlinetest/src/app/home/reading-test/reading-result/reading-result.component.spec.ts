import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingResultComponent } from './reading-result.component';

describe('ReadingResultComponent', () => {
  let component: ReadingResultComponent;
  let fixture: ComponentFixture<ReadingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

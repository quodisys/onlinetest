import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingStartComponent } from './reading-start.component';

describe('ReadingStartComponent', () => {
  let component: ReadingStartComponent;
  let fixture: ComponentFixture<ReadingStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

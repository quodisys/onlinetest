import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingMainComponent } from './reading-main.component';

describe('ReadingMainComponent', () => {
  let component: ReadingMainComponent;
  let fixture: ComponentFixture<ReadingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

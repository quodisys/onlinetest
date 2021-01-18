import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningStartComponent } from './listening-start.component';

describe('ListeningStartComponent', () => {
  let component: ListeningStartComponent;
  let fixture: ComponentFixture<ListeningStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

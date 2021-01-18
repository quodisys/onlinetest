import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningMainComponent } from './listening-main.component';

describe('ListeningMainComponent', () => {
  let component: ListeningMainComponent;
  let fixture: ComponentFixture<ListeningMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

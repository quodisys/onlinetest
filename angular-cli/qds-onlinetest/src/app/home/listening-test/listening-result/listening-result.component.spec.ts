import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningResultComponent } from './listening-result.component';

describe('ListeningResultComponent', () => {
  let component: ListeningResultComponent;
  let fixture: ComponentFixture<ListeningResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

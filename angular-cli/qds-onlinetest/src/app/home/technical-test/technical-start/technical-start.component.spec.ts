import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalStartComponent } from './technical-start.component';

describe('TechnicalStartComponent', () => {
  let component: TechnicalStartComponent;
  let fixture: ComponentFixture<TechnicalStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

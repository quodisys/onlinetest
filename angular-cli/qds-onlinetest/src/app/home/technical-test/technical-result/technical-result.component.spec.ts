import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalResultComponent } from './technical-result.component';

describe('TechnicalResultComponent', () => {
  let component: TechnicalResultComponent;
  let fixture: ComponentFixture<TechnicalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

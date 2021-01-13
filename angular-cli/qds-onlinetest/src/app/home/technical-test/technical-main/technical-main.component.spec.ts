import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalMainComponent } from './technical-main.component';

describe('TechnicalMainComponent', () => {
  let component: TechnicalMainComponent;
  let fixture: ComponentFixture<TechnicalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqStartComponent } from './iq-start.component';

describe('IqStartComponent', () => {
  let component: IqStartComponent;
  let fixture: ComponentFixture<IqStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

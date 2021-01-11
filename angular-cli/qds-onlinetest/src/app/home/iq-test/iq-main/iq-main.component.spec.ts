import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqMainComponent } from './iq-main.component';

describe('IqMainComponent', () => {
  let component: IqMainComponent;
  let fixture: ComponentFixture<IqMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

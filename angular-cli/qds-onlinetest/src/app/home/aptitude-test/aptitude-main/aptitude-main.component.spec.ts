import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptitudeMainComponent } from './aptitude-main.component';

describe('AptitudeMainComponent', () => {
  let component: AptitudeMainComponent;
  let fixture: ComponentFixture<AptitudeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptitudeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptitudeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

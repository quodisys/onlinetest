import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyStartComponent } from './vocabulary-start.component';

describe('VocabularyStartComponent', () => {
  let component: VocabularyStartComponent;
  let fixture: ComponentFixture<VocabularyStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

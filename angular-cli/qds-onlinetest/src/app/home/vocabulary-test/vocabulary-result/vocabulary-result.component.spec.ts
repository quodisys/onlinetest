import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyResultComponent } from './vocabulary-result.component';

describe('VocabularyResultComponent', () => {
  let component: VocabularyResultComponent;
  let fixture: ComponentFixture<VocabularyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

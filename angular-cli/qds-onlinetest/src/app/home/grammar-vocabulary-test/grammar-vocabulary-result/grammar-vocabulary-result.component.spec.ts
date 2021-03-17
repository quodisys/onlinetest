import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarVocabularyResultComponent } from './grammar-vocabulary-result.component';

describe('GrammarVocabularyResultComponent', () => {
  let component: GrammarVocabularyResultComponent;
  let fixture: ComponentFixture<GrammarVocabularyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarVocabularyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarVocabularyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

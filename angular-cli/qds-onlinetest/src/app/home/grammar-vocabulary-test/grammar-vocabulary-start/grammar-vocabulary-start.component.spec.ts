import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarVocabularyStartComponent } from './grammar-vocabulary-start.component';

describe('GrammarVocabularyStartComponent', () => {
  let component: GrammarVocabularyStartComponent;
  let fixture: ComponentFixture<GrammarVocabularyStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarVocabularyStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarVocabularyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

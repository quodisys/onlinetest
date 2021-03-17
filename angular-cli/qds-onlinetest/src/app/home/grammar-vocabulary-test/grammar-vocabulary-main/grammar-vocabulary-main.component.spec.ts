import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarVocabularyMainComponent } from './grammar-vocabulary-main.component';

describe('GrammarVocabularyMainComponent', () => {
  let component: GrammarVocabularyMainComponent;
  let fixture: ComponentFixture<GrammarVocabularyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarVocabularyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarVocabularyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

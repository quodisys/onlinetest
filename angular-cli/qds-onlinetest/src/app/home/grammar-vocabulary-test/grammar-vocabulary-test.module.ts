import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GrammarVocabularyTestRoutingModule } from './grammar-vocabulary-test-routing.module';
import { GrammarVocabularyStartComponent } from "./grammar-vocabulary-start/grammar-vocabulary-start.component";
import { GrammarVocabularyResultComponent } from './grammar-vocabulary-result/grammar-vocabulary-result.component';
import { GrammarVocabularyMainComponent } from './grammar-vocabulary-main/grammar-vocabulary-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareModule } from '../../shared.module'

@NgModule({
declarations: [
    GrammarVocabularyStartComponent,
    GrammarVocabularyResultComponent,
    GrammarVocabularyMainComponent
],
imports: [
    CommonModule,
    GrammarVocabularyTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ShareModule
]
})
export class GrammarVocabularyTestModule { }

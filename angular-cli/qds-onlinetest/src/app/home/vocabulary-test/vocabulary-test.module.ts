import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VocabularyTestRoutingModule } from './vocabulary-test-routing.module';
import { VocabularyStartComponent } from "./vocabulary-start/vocabulary-start.component";
import { VocabularyResultComponent } from './vocabulary-result/vocabulary-result.component';
import { VocabularyMainComponent } from './vocabulary-main/vocabulary-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareModule } from '../../shared.module'

@NgModule({
declarations: [
    VocabularyStartComponent,
    VocabularyResultComponent,
    VocabularyMainComponent
],
imports: [
    CommonModule,
    VocabularyTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ShareModule
]
})
export class VocabularyTestModule { }

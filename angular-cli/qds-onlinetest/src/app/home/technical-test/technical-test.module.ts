import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechnicalTestRoutingModule } from './technical-test-routing.module';
import { TechnicalStartComponent } from "./technical-start/technical-start.component";
import { TechnicalResultComponent } from './technical-result/technical-result.component';
import { TechnicalMainComponent } from './technical-main/technical-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareModule } from '../../shared.module'
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
declarations: [
    TechnicalStartComponent,
    TechnicalResultComponent,
    TechnicalMainComponent
],
imports: [
    CommonModule,
    TechnicalTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ShareModule,
    HighlightModule
],
providers: [
    {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
            languages: {
                typescript: () => import('highlight.js/lib/languages/typescript'),
                css: () => import('highlight.js/lib/languages/css'),
                xml: () => import('highlight.js/lib/languages/xml')
            }
        }
    }
]
})
export class TechnicalTestModule { }

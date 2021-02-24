import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReadingTestRoutingModule } from './reading-test-routing.module';
import { ReadingStartComponent } from './reading-start/reading-start.component';
import { ReadingMainComponent } from './reading-main/reading-main.component';
import { ReadingResultComponent } from './reading-result/reading-result.component';
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { ShareModule } from '../../shared.module'

@NgModule({
declarations: [
	ReadingStartComponent,
	ReadingMainComponent,
    ReadingResultComponent,
    SafeHtmlPipe
],
imports: [
    CommonModule,
    ReadingTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ShareModule
]
})
export class ReadingTestModule { }

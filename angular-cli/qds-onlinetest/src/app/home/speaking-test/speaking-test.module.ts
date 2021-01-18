import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpeakingTestRoutingModule } from './speaking-test-routing.module';
import { SpeakingStartComponent } from './speaking-start/speaking-start.component';
import { SpeakingMainComponent } from './speaking-main/speaking-main.component';
import { SpeakingResultComponent } from './speaking-result/speaking-result.component';
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
declarations: [
	SpeakingStartComponent,
	SpeakingMainComponent,
    SpeakingResultComponent
],
imports: [
    CommonModule,
    SpeakingTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
]
})
export class SpeakingTestModule { }

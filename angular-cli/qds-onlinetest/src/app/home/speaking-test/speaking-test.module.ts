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
import { ShareModule } from '../../shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SpeakingTestMicroModalComponent } from './speaking-test-micro-modal/speaking-test-micro-modal.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
declarations: [
	SpeakingStartComponent,
	SpeakingMainComponent,
    SpeakingResultComponent,
    SpeakingTestMicroModalComponent
],
imports: [
    CommonModule,
    SpeakingTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ShareModule,
    PopoverModule.forRoot()
]
})
export class SpeakingTestModule { }

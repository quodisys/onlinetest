import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToeicTestRoutingModule } from './toeic-test-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareModule } from '../../shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToeicStartComponent } from './toeic-start/toeic-start.component';
import { ToeicListeningStartComponent } from './toeic-listening-start/toeic-listening-start.component';
import { ToeicListeningMainComponent } from './toeic-listening-main/toeic-listening-main.component';
import { PlyrModule } from 'ngx-plyr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
declarations: [
ToeicStartComponent,
ToeicListeningStartComponent,
ToeicListeningMainComponent],
imports: [
    CommonModule,
    ToeicTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ShareModule,
    PlyrModule
]
})
export class ToeicTestModule { }

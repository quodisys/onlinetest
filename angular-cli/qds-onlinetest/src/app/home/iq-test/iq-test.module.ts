import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IqTestRoutingModule } from './iq-test-routing.module';
import { IqStartComponent } from "./iq-start/iq-start.component";
import { IqResultComponent } from './iq-result/iq-result.component';
import { IqMainComponent } from './iq-main/iq-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShareModule } from '../../shared.module'

@NgModule({
declarations: [
    IqStartComponent,
    IqResultComponent,
    IqMainComponent
],
imports: [
    CommonModule,
    IqTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    ShareModule,
    TabsModule.forRoot()
]
})
export class IqTestModule { }

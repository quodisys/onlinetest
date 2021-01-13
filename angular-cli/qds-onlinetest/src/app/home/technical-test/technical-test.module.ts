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
    TabsModule.forRoot()
]
})
export class TechnicalTestModule { }

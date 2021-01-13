import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AptitudeTestRoutingModule } from './aptitude-test-routing.module';
import { AptitudeStartComponent } from "./aptitude-start/aptitude-start.component";
import { AptitudeResultComponent } from './aptitude-result/aptitude-result.component';
import { AptitudeMainComponent } from './aptitude-main/aptitude-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
declarations: [
    AptitudeStartComponent,
    AptitudeResultComponent,
    AptitudeMainComponent
],
imports: [
    CommonModule,
    AptitudeTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
]
})
export class AptitudeTestModule { }

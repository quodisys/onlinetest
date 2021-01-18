import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListeningTestRoutingModule } from './listening-test-routing.module';
import { ListeningStartComponent } from "./listening-start/listening-start.component";
import { ListeningResultComponent } from './listening-result/listening-result.component';
import { ListeningMainComponent } from './listening-main/listening-main.component'
import { CountdownModule } from 'ngx-countdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
declarations: [
    ListeningStartComponent,
    ListeningResultComponent,
    ListeningMainComponent
],
imports: [
    CommonModule,
    ListeningTestRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
]
})
export class ListeningTestModule { }

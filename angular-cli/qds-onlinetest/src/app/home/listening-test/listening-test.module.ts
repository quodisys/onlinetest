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
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
    TabsModule.forRoot(),
    NgxAudioPlayerModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule
]
})
export class ListeningTestModule { }

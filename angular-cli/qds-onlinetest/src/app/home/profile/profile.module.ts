import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from '../../shared.module'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
declarations: [
	ProfileComponent
],
imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
]
})
export class ProfileModule { }

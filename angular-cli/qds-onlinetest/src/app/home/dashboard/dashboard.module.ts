import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../shared.module'
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    RouterModule,
    FormsModule,
    ShareModule,
    PopoverModule.forRoot()
  ]
})
export class DashboardModule { }

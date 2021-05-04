import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EnglishTestComponent } from './english-test.component';
import { EnglishTestRoutingModule } from './english-test-routing.module'
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../shared.module'
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    EnglishTestComponent,
  ],
  imports: [
    CommonModule,
    EnglishTestRoutingModule,
    RouterModule,
    FormsModule,
    ShareModule,
    PopoverModule.forRoot()
  ]
})
export class EnglishTestModule { }

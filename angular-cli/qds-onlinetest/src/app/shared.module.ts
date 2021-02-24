import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlockCopyPasteDirective } from './directive/disable-copy.directive';
//Ng-select for selection
@NgModule({
  	declarations: [
        BlockCopyPasteDirective
	],
  	exports: [
		BlockCopyPasteDirective
	],
  	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
	]
})
export class ShareModule { }

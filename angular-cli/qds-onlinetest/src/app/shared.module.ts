import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlockCopyPasteDirective } from './directive/disable-copy.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
//Ng-select for selection
@NgModule({
  	declarations: [
        BlockCopyPasteDirective,
		ConfirmModalComponent,
		SafeHtmlPipe
	],
  	exports: [
		BlockCopyPasteDirective,
		ConfirmModalComponent,
		SafeHtmlPipe
	],
  	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ModalModule.forRoot(),
		// SafeHtmlPipe
	]
})
export class ShareModule { }

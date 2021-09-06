import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlockCopyPasteDirective } from './directive/disable-copy.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
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
		SafeHtmlPipe,
		TranslateModule
	],
  	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ModalModule.forRoot(),
		TooltipModule.forRoot(),
		// ngx-translate and the loader module
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	]
})
export class ShareModule { }

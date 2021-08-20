import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './guards/auth.guard';
import { Globals } from './home/globalsVar';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    HighlightModule,
    ButtonsModule.forRoot(),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [AuthGuard,Globals,[
    {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
            languages: {
                typescript: () => import('highlight.js/lib/languages/typescript'),
                css: () => import('highlight.js/lib/languages/css'),
                xml: () => import('highlight.js/lib/languages/xml')
            }
        }
    }
]],
  bootstrap: [AppComponent]
})
export class AppModule { }

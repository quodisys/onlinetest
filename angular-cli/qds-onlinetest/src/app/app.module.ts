import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './guards/auth.guard';
import { EnglishTestComponent } from './home/english-test/english-test.component';
import { Globals } from './home/globalsVar';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    EnglishTestComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
  ],
  providers: [AuthGuard,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }

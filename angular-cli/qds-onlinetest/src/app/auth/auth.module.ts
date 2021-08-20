import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
imports: [
	CommonModule, 
	RouterModule, 
	FormsModule, 
	ReactiveFormsModule,
	ButtonsModule.forRoot()
],
declarations: [
	AuthComponent,
	LoginComponent
],
providers: [  ],
exports: [AuthComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexModule {}

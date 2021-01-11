import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
imports: [
	CommonModule,  
	RouterModule,
	FormsModule
],
declarations: [
	HomeComponent
],
exports: [HomeComponent],
schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}

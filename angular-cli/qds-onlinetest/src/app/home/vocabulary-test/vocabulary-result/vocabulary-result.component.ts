import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-vocabulary-result',
	templateUrl: './vocabulary-result.component.html',
	styleUrls: ['./vocabulary-result.component.scss']
})
export class VocabularyResultComponent implements OnInit {
	logo:string = ''
	constructor() { 
		
	}

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
	}
}

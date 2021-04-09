import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toeic-result',
  templateUrl: './toeic-result.component.html',
  styleUrls: ['./toeic-result.component.scss']
})
export class ToeicResultComponent implements OnInit {
	logo:string = ''
	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
	}

}

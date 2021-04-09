import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toeic-reading-start',
  templateUrl: './toeic-reading-start.component.html',
  styleUrls: ['./toeic-reading-start.component.scss']
})
export class ToeicReadingStartComponent implements OnInit {
	logo:string = ''
	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
	}

}

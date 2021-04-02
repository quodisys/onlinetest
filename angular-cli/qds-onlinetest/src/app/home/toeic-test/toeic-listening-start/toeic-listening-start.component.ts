import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toeic-listening-start',
  templateUrl: './toeic-listening-start.component.html',
  styleUrls: ['./toeic-listening-start.component.scss']
})
export class ToeicListeningStartComponent implements OnInit {
	logo:string = ''
	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
	}

}

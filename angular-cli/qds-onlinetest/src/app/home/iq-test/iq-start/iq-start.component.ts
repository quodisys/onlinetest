import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iq-start',
  templateUrl: './iq-start.component.html',
  styleUrls: ['./iq-start.component.scss']
})
export class IqStartComponent implements OnInit {
	logo:string = ''
	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
			if(this.logo == undefined || this.logo == '') {
				this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
			}
	}

}

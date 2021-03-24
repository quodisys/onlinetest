import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aptitude-result',
  templateUrl: './aptitude-result.component.html',
  styleUrls: ['./aptitude-result.component.scss']
})
export class AptitudeResultComponent implements OnInit {
  logo:string = ''
  constructor() { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
  }

}

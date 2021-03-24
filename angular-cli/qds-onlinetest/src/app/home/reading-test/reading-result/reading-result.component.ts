import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reading-result',
  templateUrl: './reading-result.component.html',
  styleUrls: ['./reading-result.component.scss']
})
export class ReadingResultComponent implements OnInit {
  logo:string = ''
  constructor() { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
  }

}

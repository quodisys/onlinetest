import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaking-result',
  templateUrl: './speaking-result.component.html',
  styleUrls: ['./speaking-result.component.scss']
})
export class SpeakingResultComponent implements OnInit {
  logo:string = ''
  constructor() { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listening-result',
  templateUrl: './listening-result.component.html',
  styleUrls: ['./listening-result.component.scss']
})
export class ListeningResultComponent implements OnInit {
  logo:string = ''
  constructor() { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
  }

}

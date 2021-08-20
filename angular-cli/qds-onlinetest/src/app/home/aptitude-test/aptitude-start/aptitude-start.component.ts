import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-aptitude-start',
  templateUrl: './aptitude-start.component.html',
  styleUrls: ['./aptitude-start.component.scss']
})
export class AptitudeStartComponent implements OnInit {
	logo:string = ''
	constructor(private translate: TranslateService) {
		translate.use("EN");
	}

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.checkLanguage();
	}

	checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
		} else {
			this.translate.use("EN");
		}
	}
}

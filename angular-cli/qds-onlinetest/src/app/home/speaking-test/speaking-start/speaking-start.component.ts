import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeakingTestMicroModalComponent } from '../speaking-test-micro-modal/speaking-test-micro-modal.component';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-speaking-start',
  templateUrl: './speaking-start.component.html',
  styleUrls: ['./speaking-start.component.scss']
})
export class SpeakingStartComponent implements OnInit {

	@ViewChild(SpeakingTestMicroModalComponent, {static: false}) private SpeakingTestMicroModalComponent: SpeakingTestMicroModalComponent;
	logo:string = ''
	constructor(private translate: TranslateService) { }

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
	openModal() {
		this.SpeakingTestMicroModalComponent.showModal();
	}

	initiateTest() {
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: "Speaking"
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/initiatetests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data;
			console.log(res);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

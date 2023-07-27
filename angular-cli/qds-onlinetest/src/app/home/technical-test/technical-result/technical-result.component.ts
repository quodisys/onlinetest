import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-technical-result',
  templateUrl: './technical-result.component.html',
  styleUrls: ['./technical-result.component.scss']
})
export class TechnicalResultComponent implements OnInit {

	url:string
	logo:string = ''

	constructor(private translate: TranslateService, private router: Router) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.checkRouter();
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
	
	checkRouter() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId')
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/allocatedtests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data;
			var test = Object.keys(res).map((k) => res[k]);
			let technicalTest = test.find( x => x.topic == "Technical");
			technicalTest = technicalTest.techtests;
			technicalTest = Object.keys(technicalTest).map((k) => technicalTest[k]);
			let flag = false;
			technicalTest.map(item => {
				if(item.status != 'Done') {
					flag = true;
				}
			})
			if(flag) {
				that.url = '/technical-test'
				console.log('Not Complete')
			} else {
				that.url = '/'
				console.log('Completed')
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	signOut = function() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			sess: localStorage.getItem('sessionId'),
			email: localStorage.getItem('email'),
			keyword: localStorage.getItem('keyword')
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/logout.php',
			data: JSON.stringify(data)
		})
		.then(function (response) {
			
			that.router.navigate(['/login'])
			console.log(response);
		})
		.catch(function (error) {
		});
	}

}

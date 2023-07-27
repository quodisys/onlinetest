import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-toeic-start',
  templateUrl: './toeic-start.component.html',
  styleUrls: ['./toeic-start.component.scss']
})
export class ToeicStartComponent implements OnInit {
	logo:string = ''
	url:string = ''
	noTest:boolean = true;
	constructor(private translate: TranslateService, private router: Router) { 
		translate.use("EN");
	}

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.getTestInfo();
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

	getTestInfo() {
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
			var mainTest = test.find( x => x.topic == "TOEIC")
			mainTest = mainTest.toeictests
			mainTest = Object.keys(mainTest).map((k) => mainTest[k]);
			console.log(mainTest);
			// mainTest[0].status = '';
			// mainTest[1].status = '';
			mainTest.sort(function(x,y){ return x.topic == "TOEIC Reading" ? -1 : y.topic == "TOEIC Reading" ? 1 : 0; });
			mainTest.map(item => {
				if(item.topic == "TOEIC Listening" && item.status != 'Done') {
					that.url = '/toeic-test/listening-start'
				} else if (item.topic == "TOEIC Reading" && item.status != 'Done') {
					that.url = '/toeic-test/reading-start'
				}
				if(item.status != 'Done') {
					that.noTest = false
				}
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	initiateTest() {
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: "Toeic"
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

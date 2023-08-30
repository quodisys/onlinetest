import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-technical-start',
  templateUrl: './technical-start.component.html',
  styleUrls: ['./technical-start.component.scss']
})
export class TechnicalStartComponent implements OnInit {
	logo:string = ''
	technicalTest:any
	testSelected:string
	isPresidentUniver: boolean = false;

    constructor(private router: Router, private translate: TranslateService) { 
		translate.use("EN");
	}

    ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		const keyword = localStorage.getItem('keyword')
		if(keyword === 'presidentunive') {
			this.isPresidentUniver = true
		}
		this.getTestTopic();
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

	initiateTest() {
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.testSelected
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

	getTestTopic() {
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
			that.technicalTest = test.find( x => x.topic == "Technical");
			that.technicalTest = that.technicalTest.techtests;
			that.technicalTest = Object.keys(that.technicalTest).map((k) => that.technicalTest[k]);
			console.log(that.technicalTest);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	onSubmit() {
		console.log(this.testSelected);
		this.initiateTest();
		this.router.navigate(['/technical-test/start-test'], { queryParams: {topic: this.testSelected}});
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

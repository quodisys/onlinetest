import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from "./../../home/globalsVar";
import axios from 'axios';
import { environment } from './../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	logo:string = ''
	dashboardTest = []
	totalTime:number = 0
	noTest: boolean = false;

	constructor(private router: Router, private formBuilder: FormBuilder, public globals: Globals, private translate: TranslateService) { 
		translate.use("EN");
	}

	ngOnInit() {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.getTest();
		this.checkLanguage();
		this.getLang();
	}

	getLang() {
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/getlang.php',
			  data: JSON.stringify({code: "VN"})
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
		});
	}

	checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
		} else {
			this.translate.use("EN");
		}
	}

	getTest() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId')
		}
		let languageStore = localStorage.getItem('language');
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/allocatedtests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data;
			console.log(response);
			that.dashboardTest = Object.keys(res).map((k) => res[k]);
			if(res.length == 0) {
				that.noTest = true;
			}
			if(res[0].error) {
				alert(res[0].error);
				that.router.navigate(['/login'])
			}
			that.dashboardTest.map(test => {
				test.totaltime = parseInt(test.totaltime);
				that.totalTime += test.totaltime
				if(languageStore === 'VN') {
					if(test.category === "Aptitude Test") {
						test.category = "ĐÁNH GIÁ NĂNG LỰC TƯ DUY"
					} else if(test.category === "English Test") {
						test.category = "BÀI KIỂM TRA TIẾNG ANH"
					} else if(test.category === "IQ Test") {
						test.category = "BÀI KIỂM TRA IQ"
					} else if(test.category === "Technical Test") {
						test.category = "BÀI KIỂM TRA KỸ THUẬT"
					} else if(test.category === "TOEIC Test") {
						test.category = "BÀI KIỂM TRA TOEIC"
					}
				}
			})
			console.log(that.dashboardTest);

		})
		.catch(function (error) {
			if(error) {
				that.router.navigate(['/login'])
			}
			console.log(error);
		});
	}

	moveInArray = function (arr, from, to) {
		// Delete the item from it's current position
		var item = arr.splice(from, 1);
		// Move the item to its new position
		arr.splice(to, 0, item[0]);
	};
}

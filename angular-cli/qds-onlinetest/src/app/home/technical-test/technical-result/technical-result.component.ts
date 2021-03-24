import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-technical-result',
  templateUrl: './technical-result.component.html',
  styleUrls: ['./technical-result.component.scss']
})
export class TechnicalResultComponent implements OnInit {

	url:string
	logo:string = ''

	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.checkRouter();
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

}

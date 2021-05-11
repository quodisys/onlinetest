import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-toeic-start',
  templateUrl: './toeic-start.component.html',
  styleUrls: ['./toeic-start.component.scss']
})
export class ToeicStartComponent implements OnInit {
	logo:string = ''
	url:string = ''
	noTest:boolean = true;
	constructor() { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.getTestInfo();
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

}

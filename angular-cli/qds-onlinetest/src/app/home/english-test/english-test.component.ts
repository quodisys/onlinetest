import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-english-test',
  templateUrl: './english-test.component.html',
  styleUrls: ['./english-test.component.scss']
})
export class EnglishTestComponent implements OnInit {
	logo:string = ''
	dashboardTest = []
	englishDashboard = []

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.getTest();
	}

	getTest() {
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
			that.dashboardTest = Object.keys(res).map((k) => res[k]);
			var engtest = that.dashboardTest.find(x => x.category == "English Test");
			var testList = engtest.engtests;
			testList = Object.keys(testList).map((k) => testList[k]);
			that.englishDashboard = testList;
			
			console.log(testList);

			if(res[0].error) {
				that.router.navigate(['/login'])
			}
			
			// that.moveInArray(that.dashboardTest, 2, 0)
			// that.moveInArray(that.dashboardTest, 3, 2)
			// that.moveInArray(that.dashboardTest, 2, 1)
			// console.log(res);
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

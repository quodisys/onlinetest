import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from "./../../home/globalsVar";
import axios from 'axios';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	dashboardTest = []
	

	constructor(private router: Router, private formBuilder: FormBuilder, public globals: Globals) { 
		// console.log(localStorage.getItem('token'))
	}

	ngOnInit() {
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
			that.moveInArray(that.dashboardTest, 2, 0)
			that.moveInArray(that.dashboardTest, 3, 2)
			that.moveInArray(that.dashboardTest, 2, 1)
			if(res[0].error) {
				that.router.navigate(['/login'])
			}
			console.log(res);
		})
		.catch(function (error) {
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

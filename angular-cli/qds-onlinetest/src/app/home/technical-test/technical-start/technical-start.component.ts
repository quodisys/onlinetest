import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-technical-start',
  templateUrl: './technical-start.component.html',
  styleUrls: ['./technical-start.component.scss']
})
export class TechnicalStartComponent implements OnInit {

	technicalTest:any
	testSelected:string

    constructor(private router: Router) { }

    ngOnInit(): void {
		this.getTestTopic();
    }

	initiateTest() {
		let that =  this;
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

}

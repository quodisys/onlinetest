import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-iq-main',
  templateUrl: './iq-main.component.html',
  styleUrls: ['./iq-main.component.scss']
})
export class IqMainComponent implements OnInit {
	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

	formAnswer: IQTestForm;
	logo:string = ''

	config = {}
	formIsSubmit = false;
	currentTab:number = 1;
	currentTabIndex:number = 0;
	score:number = 0;
	topic:string;
	testTime:number
	iqTest:any
	submitForm:any
	loading:boolean = false

	collectAnswer:any = []
	collectAnswerCopy:any = []
	correctAnswer:any = [
		{question: 1, answer: "A"},
		{question: 2, answer: "6"},
		{question: 3, answer: "22,24"},
		{question: 4, answer: "E"},
		{question: 5, answer: "27"},
		{question: 6, answer: "D"},
		{question: 7, answer: "C"},
		{question: 8, answer: "48"},
		{question: 9, answer: "A"},
		{question: 10, answer: "69237"},
		{question: 11, answer: "E"},
		{question: 12, answer: "C"},
		{question: 13, answer: "9,3,2,6,1,3,6,3,3,3,2,5,5"},
		{question: 14, answer: "51"},
		{question: 15, answer: "K,P"},
		{question: 16, answer: "E"},
		{question: 17, answer: "8"},
		{question: 18, answer: "C"},
		{question: 19, answer: "2.5,3"},
		{question: 20, answer: "B"},
		{question: 21, answer: "0"},
		{question: 22, answer: "42"},
		{question: 23, answer: "D"},
		{question: 24, answer: "1a"},
		{question: 25, answer: "31"},
		{question: 26, answer: "D"},
		{question: 27, answer: "0.18,0.14"},
		{question: 28, answer: "C"},
		{question: 29, answer: "A"},
		{question: 30, answer: "E"}
	]
	

	constructor(private elementRef: ElementRef, private router: Router, private formBuilder: FormBuilder, private translate: TranslateService) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = 'IQ';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: [{type: "IQ", score:''}]
		}
		this.getTestInfo(this.topic)
		this.config = {
			leftTime: 1160,
			format: 'mm : ss'
		}
		for(var i=1; i<=30; i++) {
			let d1 = {
				question: i,
				answer: '',
				tabClass: ''
			}
			this.collectAnswer.push(d1);
		}
		this.collectAnswer[12].answer = []
		this.checkLanguage()
	}

	checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
		} else {
			this.translate.use("EN");
		}
	}

	getTestInfo(topic) {
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
			that.iqTest = test.find( x => x.topic == "IQ");
			that.submitForm['subtopic'] = that.iqTest.subtopic;
			that.testTime = that.iqTest.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
			}
		})
		.catch(function (error) {
			if(error) {
				that.formIsSubmit = true;
				that.router.navigate(['/login'])
			}
			console.log(error);
		});
	}

	canDeactivate() {
		if(!this.formIsSubmit) {
			return confirm('Are you sure you want to leave this test ?');
		} else {
			return true
		}
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	showNextQuestion(key) {
		let prevTabIndex = key - 1; 
		this.staticTabs.tabs[key].active = true;
		console.log(this.collectAnswer[prevTabIndex])
		if(this.collectAnswer[prevTabIndex].answer != '') {
			this.collectAnswer[prevTabIndex].tabClass = "done";
		}
	}

	changeTab(e) {
		this.currentTab = e.heading;
		this.currentTabIndex = e.heading - 1;
	}

	calculateScore() {
		this.collectAnswerCopy = JSON.parse(JSON.stringify(this.collectAnswer));
		this.collectAnswerCopy[12].answer = this.collectAnswerCopy[12].answer.toString();
		this.collectAnswerCopy.map((q, i) => {
			if(q.answer == this.correctAnswer[i].answer) {
				this.score++
			}
		})
		return this.score;
	}

	onSubmit() {
		let that =  this;
		let totalScore = this.calculateScore();
		this.loading = true
		this.submitForm.qa[0].score = totalScore;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			that.formIsSubmit = true;
			that.loading = false
			that.router.navigate(['/iq-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
		console.log(this.submitForm);
	}
}

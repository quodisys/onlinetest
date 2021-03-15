import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IQTestForm } from '../../../interfaces/iq-test';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	topic:string
	config = {}
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	vocabularyForm: any;
	submitDisable = true;
	vocabularyTestInfo = {
		totaltime: 0
	}
	submitForm:any

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.topic = 'Vocabulary';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.config = {
			leftTime: 1000,
			format: 'mm : ss'
		}
		this.getTestInfo()
		this.getQuestion(this.topic);
		this.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
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
			var engtest = test.find(x => x.category == "English Test").engtests;
			engtest = Object.keys(engtest).map((k) => engtest[k]);
			that.vocabularyTestInfo = engtest.find(x => x.topic == "Reading Test");
			that.testTime = that.vocabularyTestInfo.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
			}
			console.log(that.vocabularyTestInfo);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	getQuestion(topic) {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: topic
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/gettests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			that.questionsOrinal = response.data;
			that.questionsOrinal.map((item, index) => {
				var d1 = {
					id: item.id,
					question: item.question,
					type: item.type,
					answers: []
				}
				var d2 = {
					id: parseInt(item.id),
					answer: ''
				}
				that.questions.push(d1);
				that.submitForm.qa.push(d2);
				item.answers.map((el, i) => {
					var alpha = (i+10).toString(36).toUpperCase();
					var data = {
						alphabet: alpha,
						answer: el
					}
					that.questions[index].answers.push(data);
				});	
			});
			that.questions[0]['active'] = true;
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	  
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	showNextQuestion(key) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.questions.length;
		that.questions[key].customClass = 'done'
		if(tabId < questionCount) {
			setTimeout(function() {
				that.staticTabs.tabs[tabId].active = true;
			},500)
		}
	}

	questionSelect(question, choiceKey) {
		var filterAnswer = question.answers.filter((item) => item.selected)
		this.submitAnswer(question, filterAnswer)
	}

	submitAnswer(question, answer) {
		var index = this.submitForm.qa.findIndex( x => x.id == question.id);
		if(question.type == 'radio') {
			this.submitForm.qa[index].answer = answer;
		} else if (question.type == 'checkbox') {
			let answerString = [];
			answer.map(item => {
				answerString.push(item.alphabet);
			})
			this.submitForm.qa[index].answer = answerString.join();
		}
		if(this.submitForm.qa.slice(-1)[0].answer != '') {
			this.submitDisable = false;
		}
		console.log(this.submitForm)
	}

	changeTab(e) {
		// this.onSubmit();
	}

	onSubmit() {
		console.log('aaa');
		let that =  this;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			that.router.navigate(['/vocabulary-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}

}

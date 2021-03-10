import { Component, OnInit, HostListener } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-reading-main',
  templateUrl: './reading-main.component.html',
  styleUrls: ['./reading-main.component.scss']
})
export class ReadingMainComponent implements OnInit {

	readingForm: any;
	isSticky: boolean = false;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	config = {}
	topic:string

	readingTestInfo = {
		totaltime: 0
	}
	mainQuestion:string
	testTime:number
	questions = []

	readingTest: any = {
		reading: '',
		questions: []
	}
	questionsOrinal:any = []
	submitForm:any

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.topic = "Reading"
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.config = {
			leftTime: 1800,
			format: 'mm : ss'
		}
		this.getTestInfo();
		this.getQuestion(this.topic)
		
		this.readingForm = {
			answers : []
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
			var engtest = test.find(x => x.category == "English Test").engtests;
			engtest = Object.keys(engtest).map((k) => engtest[k]);
			that.readingTestInfo = engtest.find(x => x.topic == "Reading Test");
			that.testTime = that.readingTestInfo.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
			}
			console.log(that.readingTestInfo);
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
			console.log(response)
			let data = response.data[0]
			that.mainQuestion = data.mainquestion;
			that.questionsOrinal = data.questions;
			
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
			console.log(that.questions);
		})
		.catch(function (error) {
			console.log(error);
		});
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
		console.log(this.submitForm)
	}

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	onSubmit() {
		let that =  this;
		console.log(that.submitForm)
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			that.router.navigate(['/reading-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
		// this.router.navigate(['/reading-test/result'])
	}

}

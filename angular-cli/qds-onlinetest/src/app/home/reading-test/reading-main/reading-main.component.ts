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
	logo:string = ''
	readingForm: any;
	isSticky: boolean = false;
	email: string;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	config = {}
	topic:string
	subtopic:string = ''

	readingTestInfo:any
	mainQuestion:string
	testTime:number
	questions = []

	readingTest: any = {
		reading: '',
		questions: []
	}
	questionsOrinal:any = []
	submitForm:any
	formIsSubmit = false;

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		this.email = localStorage.getItem('email');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
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
		this.readingForm = {
			answers : []
		}
	}

	canDeactivate() {
		if(!this.formIsSubmit) {
			return confirm('Are you sure you want to leave this test ?');
		} else {
			return true
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
			if(that.readingTestInfo.status === 'Done') {
				that.formIsSubmit = true;
				that.router.navigate(['/english-test'])
			}
			that.testTime = that.readingTestInfo.totaltime*60;
			that.subtopic = that.readingTestInfo.subtopic
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss',
				notify: 0
			}
			let storeReadingTimeEng:any = localStorage.getItem('readingTimeEng_'+ that.email);
			if(localStorage.getItem('readingTimeEng_'+ that.email) != null) {
				that.config = {
					leftTime: storeReadingTimeEng / 1000,
					format: 'mm : ss',
					notify: 0
				}
			}
			that.getQuestion(that.topic)
			console.log(that.readingTestInfo);
		})
		.catch(function (error) {
			if(error) {
				that.formIsSubmit = true;
				that.router.navigate(['/login'])
			}
			console.log(error);
		});
	}

	getQuestion(topic) {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: topic,
			subtopic: this.subtopic
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
					choice: '',
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
			if(localStorage.getItem('readingTestQuestionEng_'+that.email) != null) {
				that.submitForm = JSON.parse(localStorage.getItem('readingTestQuestionEng_'+that.email))
				console.log(that.questions);
				console.log(that.submitForm);
				that.submitForm.qa.map(item => {
					that.questions.map(q => {
						if(q.id == item.id) {
							q.choice = item.answer
						}
					})
				})
			}
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
		localStorage.setItem('readingTestQuestionEng_'+this.email, JSON.stringify(this.submitForm))
		console.log(this.submitForm)
		console.log(this.questions)
	}

	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('readingTimeEng_' + this.email, timeleft)
		}
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	onSubmit() {
		let that =  this;
		let notComplete = false;
		let count = 0;
		that.submitForm.qa.map(item => {
			if(item.answer == '') {
				notComplete = true;
				count++;
			}
		})
		if(notComplete) {
			if(count > 1) {
				if(confirm('There are '+ count + ' unanswered questions! Are you sure you want to submit this test ?')) {
					this.sendForm();
				}
			} else {
				if(confirm('There is '+ count + ' unanswered question! Are you sure you want to submit this test ?')) {
					this.sendForm();
				}
			}
		} else {
			this.sendForm();
		}
	}

	sendForm() {
		let that = this
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			that.formIsSubmit = true;
			localStorage.removeItem('readingTimeEng_' + that.email)
			localStorage.removeItem('readingTestQuestionEng_' + that.email)
			that.router.navigate(['/reading-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IQTestForm } from '../../../interfaces/iq-test';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-grammar-vocabulary-main',
  templateUrl: './grammar-vocabulary-main.component.html',
  styleUrls: ['./grammar-vocabulary-main.component.scss']
})
export class GrammarVocabularyMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	logo:string = ''
	topic:string
	subtopic:string = ''
	config = {}
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	vocabularyForm: any;
	submitDisable = true;
	vocabularyTestInfo:any
	submitForm:any
	formIsSubmit = false;
	email: string;
	loading:boolean = false
	testid:string = ''

	constructor(private router: Router, private translate: TranslateService) { }

	ngOnInit(): void {
		this.email = localStorage.getItem('email');
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = 'Grammar & Vocabulary';
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
		// this.getQuestion(this.topic);
		this.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
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
			that.vocabularyTestInfo = engtest.find(x => x.topic == "Grammar & Vocabulary Test");
			// that.topic = that.vocabularyTestInfo.topic
			that.testid = that.vocabularyTestInfo.testid
			that.subtopic = that.vocabularyTestInfo.subtopic
			that.testTime = that.vocabularyTestInfo.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss',
				notify: 0
			}
			let storeGrammaTime:any = localStorage.getItem('grammaTime_'+ that.email);
			if(storeGrammaTime != null) {
				that.config = {
					leftTime: storeGrammaTime / 1000,
					format: 'mm : ss',
					notify: 0
				}
			}
			let grammaQuestion = JSON.parse(localStorage.getItem('grammaQuestions_'+ that.email))
			if(grammaQuestion != null) {
				that.questions = grammaQuestion;
				
				let storedGrammaAnswer = JSON.parse(localStorage.getItem('grammaAnswer_' + that.email));
				if(storedGrammaAnswer != null) {
					that.submitForm = {...storedGrammaAnswer};
					that.submitForm.qa.map(item => {
						let index = that.questions.findIndex(i => i.id == item.id)
						that.questions[index].choice = item.answer;
					})
				}
			} else {
				that.getQuestion(that.topic)
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
			that.questionsOrinal = response.data;
			that.questionsOrinal.map((item, index) => {
				var d1 = {
					id: item.id,
					question: item.question,
					type: item.type,
					answers: [],
					choice: ''
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
			localStorage.setItem('grammaQuestions_'+ that.email, JSON.stringify(that.questions));
			console.log(that.questions);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	  
	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('grammaTime_' + this.email, timeleft)
		}
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
				that.questions[key + 1].active = true;
				localStorage.setItem('grammaQuestions_'+ that.email, JSON.stringify(that.questions));
			},500)
		}
		localStorage.setItem('grammaAnswer_' + this.email, JSON.stringify(this.submitForm))
		localStorage.setItem('grammaQuestions_'+ this.email, JSON.stringify(this.questions));
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
		console.log(this.submitForm);
		if(this.submitForm.qa.slice(-1)[0].answer != '') {
			this.submitDisable = false;
		}
		localStorage.setItem('grammaAnswer_' + this.email, JSON.stringify(this.submitForm))
		
		console.log(this.questions);
	}

	changeTab(e) {
		// this.onSubmit();
	}

	onSubmit() {
		let that =  this;
		this.loading = true
		this.submitForm['testid'] = that.testid
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			that.formIsSubmit = true;
			that.loading = false
			localStorage.removeItem('grammaAnswer_' + that.email)
			localStorage.removeItem('grammaQuestions_' + that.email)
			localStorage.removeItem('grammaTime_' + that.email)
			that.router.navigate(['/grammar-vocabulary-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}

}

import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-listening-main',
  templateUrl: './listening-main.component.html',
  styleUrls: ['./listening-main.component.scss']
})
export class ListeningMainComponent implements OnInit {
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	options:any
	logo:string = ''
	audioLink1:string;
	audioLink2:string;
	vocabularyTest:any;
	questionPart1: any;
	questionPart2: any;

	listeningTestInfo:any;

	vocabularyForm: any;

	isSticky: boolean = false;
	formIsSubmit = false;
	email: string;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	msaapPlaylist = []

	topic:string
	subtopic:string = ''
	config = {}
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	submitForm:any
	testid:string = ''

	constructor(private router: Router, private translate: TranslateService) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		this.email = localStorage.getItem('email');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = 'Listening';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		// this.getQuestion(this.topic);
		this.getTestInfo();
		this.config = {
			leftTime: 1360,
			format: 'mm : ss'
		}
		this.vocabularyForm = {
			answers : []
		}
		this.options = {
			enabled: true,
			controls: ['play', 'progress', 'current-time', 'mute']
		};
		this.checkLanguage();
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
			that.listeningTestInfo = engtest.find(x => x.topic == "Listening Test");
			that.testid = that.listeningTestInfo.testid
			that.testTime = that.listeningTestInfo.totaltime*60;
			that.subtopic = that.listeningTestInfo.subtopic
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss',
				notify: 0
			}
			if(that.listeningTestInfo.status === 'Done') {
				that.formIsSubmit = true;
				that.router.navigate(['/english-test'])
			}
			let storeListeningTimeEng:any = localStorage.getItem('listeningTimeEng_'+ that.email);
			if(localStorage.getItem('listeningTimeEng_'+ that.email) != null) {
				that.config = {
					leftTime: storeListeningTimeEng / 1000,
					format: 'mm : ss',
					notify: 0
				}
			}
			that.getQuestion(that.topic)
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
			that.questionsOrinal = {...response.data[0]};
			that.audioLink1 = that.questionsOrinal.mainquestion;
			that.audioLink2 = that.questionsOrinal.secondquestion;

			var fullQuestion = that.questionsOrinal.questions;
			var halfLength = fullQuestion.length / 2;
			//=========================================================
			that.questionPart1 = fullQuestion.splice(0, halfLength);
			var questionPart1Orinal = [...that.questionPart1];
			that.questionPart1.map((question, i) => {
				if(question.type == 'radio') {
					var d1 = {
						id: question.id,
						question: question.question,
						answers: [],
						type: question.type,
						choice: ''
					}
					questionPart1Orinal[i].answers.map((a, i) => {
						var alpha = (i+10).toString(36).toUpperCase();
						var d2 = {
							alphabet: alpha,
							answer: a
						}
						d1.answers.push(d2);
					})
					that.questionPart1[i] = d1;
				}
			})
			//=========================================================
			that.questionPart2 = fullQuestion;
			var questionPart2Orinal = [...that.questionPart2];
			that.questionPart2.map((question, i) => {
				if(question.type == 'radio') {
					var d1 = {
						id: question.id,
						question: question.question,
						answers: [],
						type: question.type,
						choice: ''
					}
					questionPart2Orinal[i].answers.map((a, i) => {
						var alpha = (i+10).toString(36).toUpperCase();
						var d2 = {
							alphabet: alpha,
							answer: a
						}
						d1.answers.push(d2);
					})
					that.questionPart2[i] = d1;
				}
			})
			//=========================================================
			that.vocabularyTest = [
				{
					audioLink: environment.hostApi+'/questions/'+that.audioLink1,
					title: that.questionsOrinal.title1,
					questions: that.questionPart1
				}
			]

			
			if(that.audioLink2 != "" && that.audioLink2 != undefined) {
				var testPart2 = {
					audioLink: environment.hostApi+'/questions/'+that.audioLink2,
					title: that.questionsOrinal.title2,
					questions: that.questionPart2
				}
				that.vocabularyTest.push(testPart2);
			}

			that.vocabularyTest.forEach(item => {
				let main = [
					{
						src: item.audioLink,
						type: 'audio/mp3',
						allow: 2,
						isDisabled: false
					}
				]
				that.msaapPlaylist.push(main);
			});

			var vocabularyCopy = [...that.vocabularyTest]
			console.log(vocabularyCopy);
			vocabularyCopy.map((item, index) => {
				item.questions.map((it, i) => {
					var d2 = {
						id: parseInt(it.id),
						answer: ''
					}
					that.submitForm.qa.push(d2);
				})
			})
			if(localStorage.getItem('listeningTestQuestionEng_'+that.email) != null) {
				that.submitForm = JSON.parse(localStorage.getItem('listeningTestQuestionEng_'+that.email))
				that.vocabularyTest.map(testSection => {
					testSection.questions.map(question => {
						that.submitForm.qa.map(item => {
							if(item.id == question.id) {
								question.choice = item.answer;
							}
						})
					})
				})
			}
		})
		.catch(function (error) {
			console.log(error);
		});
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
		} else {
			this.submitForm.qa[index].answer = answer;
		}
		localStorage.setItem('listeningTestQuestionEng_'+this.email, JSON.stringify(this.submitForm))
	}
	  
	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('listeningTimeEng_' + this.email, timeleft)
		}
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	//Audio Player
	
	played(event: Plyr.PlyrEvent) {
		// console.log('played', event);
	}

	ended(event: Plyr.PlyrEvent, index) {
		this.msaapPlaylist[index][0].allow = this.msaapPlaylist[index][0].allow - 1;
		if(this.msaapPlaylist[index][0].allow <= 0) {
			this.msaapPlaylist[index][0].isDisabled = true;
		}
	}
	
	play(): void {
		this.player.play(); // or this.plyr.player.play()
	}
	

	onSubmit() {
		let that =  this;
		this.submitForm.testid = this.testid
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			that.formIsSubmit = true;
			localStorage.removeItem('listeningTimeEng_' + that.email)
			localStorage.removeItem('listeningTestQuestionEng_' + that.email)
			that.router.navigate(['/listening-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}

	signOut = function() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			sess: localStorage.getItem('sessionId'),
			email: localStorage.getItem('email'),
			keyword: localStorage.getItem('keyword')
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/logout.php',
			data: JSON.stringify(data)
		})
		.then(function (response) {
			
			that.router.navigate(['/login'])
			console.log(response);
		})
		.catch(function (error) {
		});
	}
}

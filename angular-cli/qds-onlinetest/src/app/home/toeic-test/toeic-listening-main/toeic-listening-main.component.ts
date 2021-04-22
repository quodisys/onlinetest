import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CountdownEvent } from 'ngx-countdown';
import { ListeningQuestions } from './example-questions';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-toeic-listening-main',
  templateUrl: './toeic-listening-main.component.html',
  styleUrls: ['./toeic-listening-main.component.scss']
})
export class ToeicListeningMainComponent implements OnInit {
	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	testTime:number
	logo:string=''
	config = {}
	submitDisable = true;
	listeningQuestions:any;
	options:any
	currentTabIndex:number = 0;
	resultPage: boolean = false;
	isDropup = true;
	questionsOrinal:any = []
	submitForm:any
	topic:string = "TOEIC Listening"
	subtopic:string = ''
	formIsSubmit:boolean = false;

	constructor(private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.config = {
			leftTime: 2700,
			format: 'mm : ss'
		}
		this.options = {
			enabled: true,
			controls: ['play', 'progress', 'current-time', 'mute'],
			autoplay: true
		};
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.getTestInfo()
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
			var mainTest = test.find( x => x.topic == "TOEIC")
			mainTest = mainTest.toeictests
			mainTest = Object.keys(mainTest).map((k) => mainTest[k]);
			mainTest = mainTest.find( x => x.topic == "TOEIC Listening")
			console.log(mainTest)
			that.testTime = mainTest.totaltime*60;
			that.subtopic = mainTest.subtopic
			that.config = {
				leftTime: that.testTime,
				format: 'HH : mm : ss'
			}
			that.getQuestion(that.topic)
			that.submitForm['subtopic'] = mainTest.subtopic
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
			url: environment.hostApi + '/candidates/gettoeiclisteningtests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			let data = response.data
			that.listeningQuestions = data;
			console.log(that.listeningQuestions)
			//Audio array
			that.listeningQuestions.map(item => {
				item['audio'] = []
				let audio = {
					src: item.audioUrl,
					type: 'audio/mp3'
				}
				item['audio'].push(audio);
			})
			/////////////////////////////////////////////
			let questionNumber = 0;
			that.listeningQuestions.map((item, key) => {
				item['active'] = false
				if(item.type == 'image-question' || item.type == 'single-question') {
					questionNumber++;
					item.answers.map((ans, i) => {
						var alpha = (i+10).toString(36).toUpperCase();
						let d1 = {
							alphabet: alpha,
							answer: ans
						}
						item.answers[i] = d1
					})
					let d2 = {
						id: item.id,
						answer: "",
						isViewed: false
					}
					that.submitForm.qa.push(d2)
					item['questionNumber'] = questionNumber;
				} else if (item.type == 'multiple-question') {
					item.questions.map((question, index) => {
						questionNumber++;
						question['questionNumber'] = questionNumber;
						question.answers.map((ans, i) => {
							var alpha = (i+10).toString(36).toUpperCase();
							question.answers[i] = {
								alphabet: alpha,
								answer: ans
							}
						})
						let d2 = {
							id: question.id,
							answer: "",
							isViewed: false
						}
						that.submitForm.qa.push(d2)
					})
				}
			})
			that.listeningQuestions[0].active = true
			console.log(that.submitForm.qa)
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
		let question = this.listeningQuestions[tabId];
		///////////////////////////////////////////////////
		let questionCount = this.listeningQuestions.length;
		if(tabId < questionCount) {
			if(question.type == "multiple-question") {
				question.questions.map(item => {
					let answerIndex = this.submitForm.qa.findIndex(x => x.id == item.id);
					if(answerIndex >= 0) {
						this.submitForm.qa[answerIndex].isViewed = true
					}
				})
			} else {
				let answerIndex = this.submitForm.qa.findIndex(x => x.id == this.listeningQuestions[tabId].id);
				if(answerIndex >= 0) {
					this.submitForm.qa[answerIndex].isViewed = true
				}
			}
			that.staticTabs.tabs[tabId].active = true;
			window.scroll(0,0);
		} else if (tabId == questionCount) {
			that.resultPage = true;
		}
	}

	changeTab(e) {
		this.currentTabIndex = e.heading - 1;
	}

	goTab(id) {
		this.resultPage = false;
		let singId = this.listeningQuestions.findIndex(x => x.id == id);
		if(singId == undefined || singId < 0) {
			this.listeningQuestions.map((d1, i1) => {
				if(d1.type == 'multiple-question') {
					d1.questions.map((d2) => {
						if(d2.id == id) {
							this.listeningQuestions[i1].active = true
						}
					})
				}
			})
		} else {
			this.listeningQuestions[singId].active = true
		}
		window.scroll(0,0);
	}

	getIndex(arr, id) {
		var i, ii, len, elemlen;
		for (i = 0, len = arr.length; i < len; i++) {
			console.log(len);
			let elements = arr[i].questions;
			for (ii = 0, elemlen = elements.length; ii < elemlen; ii++) {
				if (elements[ii].id === id) {
					return i;
				}
			}
		}
	}

	submitAnswer(question, alphabet) {
		let index = this.submitForm.qa.findIndex( x => x.id == question.id);
		this.submitForm.qa[index].answer = alphabet;
		console.log(this.submitForm)
	}

	onSubmit() {
		let that =  this;
		this.submitForm.qa.map(item => {
			delete item.isViewed
		})
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtoeictests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			console.log(response)
			that.formIsSubmit = true;
			that.router.navigate(['toeic-test/reading-start'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}

}

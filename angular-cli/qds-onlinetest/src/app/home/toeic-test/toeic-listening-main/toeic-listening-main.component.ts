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
	listeningQuestions:any = ListeningQuestions;
	options:any
	currentTabIndex:number = 0;
	resultPage: boolean = false;
	isDropup = true;
	questionsOrinal:any = []
	submitForm:any
	topic:string = "Toeic Listening"

	constructor(private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.config = {
			leftTime: 1800,
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
		//Audio array
		this.listeningQuestions.map(item => {
			item['audio'] = []
			let audio = {
				src: item.audioLink,
				type: 'audio/mp3'
			}
			item['audio'].push(audio);
		})
		/////////////////////////////////////////////
		console.log(this.listeningQuestions)
		let questionNumber = 0;
		this.listeningQuestions.map((item, key) => {
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
					answer: ""
				}
				this.submitForm.qa.push(d2)
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
						answer: ""
					}
					this.submitForm.qa.push(d2)
				})
			}
		})
		this.listeningQuestions[0].active = true
		console.log(this.listeningQuestions)
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			// this.onSubmit();
		}
	}

	showNextQuestion(key) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.listeningQuestions.length;
		// that.questions[key].customClass = 'done'
		if(tabId < questionCount) {
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

	played(event: Plyr.PlyrEvent) {
		// console.log('played', event);
	}
	ready(event: Plyr.PlyrEvent) {
		// console.log('ready', event);
	}

	submitAnswer(question, alphabet) {
		let index = this.submitForm.qa.findIndex( x => x.id == question.id);
		this.submitForm.qa[index].answer = alphabet;
	}

	onSubmit() {
		// let that =  this;
		// console.log(that.submitForm)
		// axios({
		// 	method: 'post',
		// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// 	url: environment.hostApi + '/candidates/processtests.php',
		// 	data: JSON.stringify(this.submitForm)
		// })
		// .then(function (response) {
		// 	console.log(that.submitForm);
		// 	that.formIsSubmit = true;
		// 	that.router.navigate(['/technical-test/result'])
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// 	alert("Something wrong when submitting test!")
		// });
	}

}

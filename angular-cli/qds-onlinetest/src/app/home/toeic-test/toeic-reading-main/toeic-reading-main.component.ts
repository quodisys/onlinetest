import { Component, OnInit, ViewChild } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CountdownEvent } from 'ngx-countdown';
import { ReadingQuestions } from './example-questions';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-toeic-reading-main',
  templateUrl: './toeic-reading-main.component.html',
  styleUrls: ['./toeic-reading-main.component.scss']
})
export class ToeicReadingMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	testTime:number
	logo:string=''
	config = {}
	submitDisable = true;
	readingQuestions:any = ReadingQuestions;
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
			leftTime: 4500,
			format: 'HH : mm : ss'
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
		this.readingQuestions.map(item => {
			item['audio'] = []
			let audio = {
				src: item.audioLink,
				type: 'audio/mp3'
			}
			item['audio'].push(audio);
		})
		let questionNumber = 100;
		this.readingQuestions.map((item, key) => {
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
		this.readingQuestions[0].active = true
		console.log(this.readingQuestions)
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.onSubmit();
		}
	}
	changeTab(e) {
		this.currentTabIndex = e.heading - 1;
	}
	submitAnswer(question, alphabet) {
		let index = this.submitForm.qa.findIndex( x => x.id == question.id);
		this.submitForm.qa[index].answer = alphabet;
		console.log(this.submitForm);
	}
	goTab(id) {
		this.resultPage = false;
		let singId = this.readingQuestions.findIndex(x => x.id == id);
		if(singId == undefined || singId < 0) {
			this.readingQuestions.map((d1, i1) => {
				if(d1.type == 'multiple-question') {
					d1.questions.map((d2) => {
						if(d2.id == id) {
							this.readingQuestions[i1].active = true
						}
					})
				}
			})
		} else {
			this.readingQuestions[singId].active = true
		}
		window.scroll(0,0);
	}
	showNextQuestion(key) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.readingQuestions.length;
		if(tabId < questionCount) {
			that.staticTabs.tabs[tabId].active = true;
			window.scroll(0,0);
		} else if (tabId == questionCount) {
			that.resultPage = true;
		}
	}
	onSubmit() {
		console.log('submited')
		this.router.navigate(['toeic-test/result'])
	}
}

import { Component, OnInit, ViewChild, TemplateRef, HostListener  } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CountdownEvent } from 'ngx-countdown';
import { ReadingQuestions } from './example-questions';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-toeic-reading-main',
  templateUrl: './toeic-reading-main.component.html',
  styleUrls: ['./toeic-reading-main.component.scss']
})
export class ToeicReadingMainComponent implements OnInit {
	modalRef: BsModalRef | null;
	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	testTime:number
	logo:string=''
	email:string=''
	config = {}
	submitDisable = true;
	readingQuestions:any = ReadingQuestions;
	options:any
	currentTabIndex:number = 0;
	resultPage: boolean = false;
	isDropup = true;
	questionsOrinal:any = []
	submitForm:any
	topic:string = "TOEIC Reading"
	subtopic:string = ''
	formIsSubmit:boolean = false;
	testid:string = ''
	constructor(private router: Router, private route: ActivatedRoute, private modalService: BsModalService, private translate: TranslateService) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		this.email = localStorage.getItem('email');
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
		this.getTestInfo();
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

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
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
			mainTest = mainTest.find( x => x.topic == "TOEIC Reading")
			if(mainTest.status == 'Done') {
				that.formIsSubmit = true;
				that.router.navigate(['toeic-test'])
			}
			that.testid = mainTest.testid
			that.testTime = mainTest.totaltime*60;
			that.subtopic = mainTest.subtopic
			that.config = {
				leftTime: that.testTime,
				format: 'HH : mm : ss',
				notify: 0
			}
			let storeReadingTime:any = localStorage.getItem('readingTime_' + that.email);
			if(localStorage.getItem('readingTime_' + that.email) != null) {
				that.config = {
					leftTime: storeReadingTime / 1000,
					format: 'HH : mm : ss',
					notify: 0
				}
			}
			that.getQuestion(that.topic)
			that.submitForm['subtopic'] = that.subtopic
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
			url: environment.hostApi + '/candidates/gettoeicreadingtests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			let data = response.data
			that.readingQuestions = data;
			//Audio array
			that.readingQuestions.map(item => {
				item['audio'] = []
				let audio = {
					src: item.audioLink,
					type: 'audio/mp3'
				}
				item['audio'].push(audio);
			})
			let questionNumber = 100;
			that.readingQuestions.map((item, key) => {
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
			let storeReadingAnswer = JSON.parse(localStorage.getItem('readingAnswer_' + that.email));
			
			if(localStorage.getItem('readingAnswer_' + that.email) != null) {
				that.submitForm = {...storeReadingAnswer};
				that.submitForm.qa.map(item => {
					if(item.answer != '') {
						let index = that.readingQuestions.findIndex(i => i.id == item.id)
						if(index < 0) {
							that.readingQuestions.map(rd => {
								if(rd.type == "multiple-question") {
									rd.questions.map(d1 => {
										if(d1.id == item.id) {
											d1.choice = item.answer
										}
									})
								}
							})
						} else {
							that.readingQuestions[index].choice = item.answer
						}
					}
				})
			}
			that.readingQuestions[0].active = true
			// console.log(that.readingQuestions)
			// console.log(that.submitForm);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('readingTime_' + this.email, timeleft)
		}
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
		localStorage.setItem('readingAnswer_' + this.email, JSON.stringify(this.submitForm))
		// console.log(this.readingQuestions);
		// console.log(this.submitForm);
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
		let question = this.readingQuestions[tabId];
		let questionCount = this.readingQuestions.length;
		if(tabId < questionCount) {
			if(question.type == "multiple-question") {
				question.questions.map(item => {
					let answerIndex = this.submitForm.qa.findIndex(x => x.id == item.id);
					if(answerIndex >= 0) {
						this.submitForm.qa[answerIndex].isViewed = true
					}
				})
			} else {
				let answerIndex = this.submitForm.qa.findIndex(x => x.id == this.readingQuestions[tabId].id);
				if(answerIndex >= 0) {
					this.submitForm.qa[answerIndex].isViewed = true
				}
			}
			that.staticTabs.tabs[tabId].active = true;
			window.scroll(0,0);
		} else if (tabId == questionCount) {
			that.resultPage = true;
		}
		localStorage.setItem('readingAnswer_' + this.email, JSON.stringify(this.submitForm))
	}
	onSubmit() {
		let that =  this;
		this.submitForm.qa.map(item => {
			delete item.isViewed
		})
		this.submitForm['testid'] = this.testid
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtoeictests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			localStorage.removeItem('readingTime_' + that.email)
			localStorage.removeItem('readingAnswer_' + that.email)
			that.formIsSubmit = true;
			that.router.navigate(['toeic-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CountdownEvent } from 'ngx-countdown';
import { ListeningQuestions } from './example-questions';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import {TranslateService} from '@ngx-translate/core';

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
	email:string=''
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
	testid:string = ''
	error:any
	isPresidentUniver: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		this.email = localStorage.getItem('email');
		this.error = localStorage.getItem('error')
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		const keyword = localStorage.getItem('keyword')
		if(keyword === 'presidentunive') {
			this.isPresidentUniver = true
		}
		this.config = {
			leftTime: 2700,
			format: 'mm : ss'
		}
		this.options = {
			enabled: true,
			controls: ['play', 'progress', 'current-time'],
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
		this.checkLanguage()
		this.sendError()
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
			var mainTest = test.find( x => x.topic == "TOEIC")
			mainTest = mainTest.toeictests
			mainTest = Object.keys(mainTest).map((k) => mainTest[k]);
			mainTest = mainTest.find( x => x.topic == "TOEIC Listening")
			if(mainTest.status == 'Done') {
				that.formIsSubmit = true;
				that.router.navigate(['toeic-test']);
			}
			that.testid = mainTest.testid
			that.testTime = mainTest.totaltime*60;
			that.subtopic = mainTest.subtopic
			that.config = {
				leftTime: that.testTime,
				format: 'HH : mm : ss',
				notify: 0
			}
			let storeListeningTime:any = localStorage.getItem('listeningTime_'+ that.email);
			if(localStorage.getItem('listeningTime_'+ that.email) != null) {
				that.config = {
					leftTime: storeListeningTime / 1000,
					format: 'HH : mm : ss',
					notify: 0
				}
			}
			that.getQuestion(that.topic)
			that.submitForm['subtopic'] = mainTest.subtopic
		})
		.catch(function (error) {
			if(error) {
				that.formIsSubmit = true;
				that.router.navigate(['/home'])
			}
			console.log(error);
		});
	}

	sendError() {
		let that = this
		let subtopic = localStorage.getItem('subtopic')
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			subtopic: subtopic,
			error: that.error
		}
		if(that.error != undefined || that.error != '') {
			axios({
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url: environment.hostApi + '/candidates/saveerror.php',
				data: data
			}).then(function(response) {
				localStorage.removeItem('error')
			}).catch(function(error) {
				console.log(error);
			})
		}
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
			let storeListeningAnswer = JSON.parse(localStorage.getItem('listeningAnswer_' + that.email));
			
			if(localStorage.getItem('listeningAnswer_' + that.email) != null) {
				that.submitForm = {...storeListeningAnswer};
				that.submitForm.qa.map(item => {
					if(item.answer != '') {
						let index = that.listeningQuestions.findIndex(i => i.id == item.id)
						if(index < 0) {
							that.listeningQuestions.map(rd => {
								if(rd.type == "multiple-question") {
									rd.questions.map(d1 => {
										if(d1.id == item.id) {
											d1.choice = item.answer
										}
									})
								}
							})
						} else {
							that.listeningQuestions[index].choice = item.answer
						}
					}
				})
			}
			that.listeningQuestions[0].active = true
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('listeningTime_' + this.email, timeleft)
		}
		if(e.action == 'done') {
			let that =  this;
			this.submitForm.qa.map(item => {
				delete item.isViewed
			})
			this.submitForm['testid'] = this.testid
			axios({
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url: environment.hostApi + '/candidates/processexpiredtests.php',
				data: JSON.stringify(this.submitForm)
			})
			.then(function (response) {
				localStorage.removeItem('listeningTime_' + that.email)
				localStorage.removeItem('listeningAnswer_' + that.email)
				alert('Time Expired. Cannot submit the Test')
				that.router.navigate(['/home'])
				
			})
			.catch(function (error) {
				let errorData = error
				if(errorData = "Error: Network Error") {
					alert("Something wrong when submitting test! Please check your connection and try again.")
				} else {
					alert(errorData)
				}
				localStorage.setItem('error', JSON.stringify(errorData))
				localStorage.setItem('subtopic', that.subtopic)
				console.log(error);
			});
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
						if(this.submitForm.qa[answerIndex].isViewed) {
							this.options.autoplay = false;
						} else {
							this.options.autoplay = true;
						}
						this.submitForm.qa[answerIndex].isViewed = true
					}
				})
			} else {
				let answerIndex = this.submitForm.qa.findIndex(x => x.id == this.listeningQuestions[tabId].id);
				if(answerIndex >= 0) {
					if(this.submitForm.qa[answerIndex].isViewed) {
						this.options.autoplay = false;
					} else {
						this.options.autoplay = true;
					}
					this.submitForm.qa[answerIndex].isViewed = true
				}
			}
			that.staticTabs.tabs[tabId].active = true;
			window.scroll(0,0);
		} else if (tabId == questionCount) {
			that.resultPage = true;
		}
		localStorage.setItem('listeningAnswer_' + this.email, JSON.stringify(this.submitForm))
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
						let answerIndex = this.submitForm.qa.findIndex(x => x.id == d2.id);
						if(this.submitForm.qa[answerIndex].isViewed) {
							this.options.autoplay = false;
						}
						if(d2.id == id) {
							this.listeningQuestions[i1].active = true
						}
					})
				}
			})
		} else {
			let answerIndex = this.submitForm.qa.findIndex(x => x.id == id);
			if(this.submitForm.qa[answerIndex].isViewed) {
				this.options.autoplay = false;
			}
			this.listeningQuestions[singId].active = true
		}
		window.scroll(0,0);
	}

	getIndex(arr, id) {
		var i, ii, len, elemlen;
		for (i = 0, len = arr.length; i < len; i++) {
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
		localStorage.setItem('listeningAnswer_' + this.email, JSON.stringify(this.submitForm))
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
			let languageStore = localStorage.getItem('language');
			if(response.data[0].error) {
				if(response.data[0].error === 'Test Submission is Disabled') {
					if(languageStore === 'VN') {
						alert("Quản trị viên đã vô hiệu hoá bài kiểm tra của bạn, kết quả kiểm tra của bạn sẽ không được ghi nhận.")
					} else {
						alert("Your test was disabled by the admin and your test results will not be recorded.")
					}
					localStorage.setItem('error', response.data[0].error)
				} else {
					alert(response.data[0].error)
					localStorage.setItem('error', response.data[0].error)
				}
			} else {
				localStorage.removeItem('listeningTime_' + that.email)
				localStorage.removeItem('listeningAnswer_' + that.email)
				that.formIsSubmit = true;
				that.router.navigate(['toeic-test/reading-start'])
			}
			
		})
		.catch(function (error) {
			let errorData = error
			if(errorData = "Error: Network Error") {
				alert("Something wrong when submitting test! Please check your connection and try again.")
			} else {
				alert(errorData)
			}
			localStorage.setItem('error', JSON.stringify(errorData))
			localStorage.setItem('subtopic', that.subtopic)
			console.log(error);
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

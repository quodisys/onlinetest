import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CountdownEvent, CountdownComponent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-speaking-main',
  templateUrl: './speaking-main.component.html',
  styleUrls: ['./speaking-main.component.scss']
})
export class SpeakingMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild('cd', { static: false }) private countdown: CountdownComponent;
	@ViewChild('confirmSwal') private confirmSwal: SwalComponent;
	logo:string = ''
	topic:string
	subtopic:string = ''
	email:string = ''
	isLoading:boolean = false;
	submitForm:any
	formAnswer: IQTestForm;
	speakingTestInfo:any
	testTime:number
	questionsOrinal:any = []
	questions:any = []
	questionType:string = 'first'
	formData:any
	isOpen: boolean = false
	isStopOpen: boolean = false
	testid:string = ''

	recording: Boolean = false;

	finishRecord:boolean = false;

	config = {}
	formIsSubmit:boolean = false;
	currentQuestion:any
	//Lets declare Record OBJ
	record;
	//URL of Blob
	url;
	trueUrl
	error;
	constructor(private elementRef: ElementRef, private router: Router, private domSanitizer: DomSanitizer, private translate: TranslateService) { }


	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		this.email = localStorage.getItem('email');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = 'Speaking';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.getTestInfo();
		this.config = {
			leftTime: 1000,
			format: 'mm : ss'
		}
		this.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
		this.isOpen = true
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

	@HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
		let result = confirm("Are you sure you want to leave this test ?");
		if (result) {
		  // Do more processing... 
		}
		event.returnValue = false; // stay on same page
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
			that.speakingTestInfo = engtest.find(x => x.topic == "Speaking Test");

			if(that.speakingTestInfo.status === 'Done') {
				that.formIsSubmit = true;
				that.router.navigate(['/english-test'])
			}
			console.log(that.speakingTestInfo);
			that.testid = that.speakingTestInfo.testid
			that.subtopic = that.speakingTestInfo.subtopic
			that.testTime = that.speakingTestInfo.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss',
				notify: 0
			}
			let storeSpeakingTime:any = localStorage.getItem('speakingTime_'+ that.email);
			if(localStorage.getItem('speakingTime_'+ that.email) != null) {
				that.config = {
					leftTime: storeSpeakingTime / 1000,
					format: 'HH : mm : ss',
					notify: 0
				}
			}
			if(localStorage.getItem('speakingTestQuestion_'+ that.email) == null) {
				that.getQuestion(that.topic)
			} else {
				that.questions = JSON.parse(localStorage.getItem('speakingTestQuestion_'+ that.email));
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
			console.log(that.questionsOrinal)
			that.questionsOrinal.map((item, index) => {
				var d1 = {
					id: item.id,
					question: item.question,
					type: item.type
				}
				that.questions.push(d1);
			});
			that.questions[0]['active'] = true;
			localStorage.setItem('speakingTestQuestion_'+ that.email, JSON.stringify(that.questions))
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	counterEvent(e: CountdownEvent) {
		let timeleft:any = e.left
		if(e.action == 'notify') {
			localStorage.setItem('speakingTime_' + this.email, timeleft)
		}
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	showNextQuestion(key, last, isSkip) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.questions.length;
		this.questionType = 'first'

		if(isSkip) {
			if(tabId < questionCount) {
				setTimeout(function() {
					that.staticTabs.tabs[tabId].active = true;
					that.questions[key + 1].active = true;
					localStorage.setItem('speakingTestQuestion_'+ that.email, JSON.stringify(that.questions))
				},500)
			}
		} else {
			this.countdown.pause();
			this.isLoading = true;
			if(last) {
				this.formData.set('questiontype', 'last');
			}
			axios({
				method: 'post',
				headers: { 'Content-Type': 'multipart/form-data' },
				url: environment.hostApi + '/candidates/processspeakingtest.php',
				data: this.formData
			})
			.then(function (response) {
				console.log(response)
				if(!response.data[0].error) {
					if(last) {
						that.formIsSubmit = true;
						that.router.navigate(['/speaking-test/result'])
						localStorage.removeItem('speakingTime_' + that.email)
						localStorage.removeItem('speakingTestQuestion_' + that.email)
					} else {
						that.countdown.resume();
						that.finishRecord = false;
						that.isLoading = false;
						that.questions[key].customClass = 'done'
						if(tabId < questionCount) {
							setTimeout(function() {
								that.staticTabs.tabs[tabId].active = true;
								that.questions[key + 1].active = true;
								localStorage.setItem('speakingTestQuestion_'+ that.email, JSON.stringify(that.questions))
							},500)
						}
					}
				} else {
					alert(response.data[0].error);
					that.questionType = '';
					that.countdown.resume();
					that.finishRecord = false;
					that.isLoading = false;
				}
			})
			.catch(function (error) {
				that.countdown.resume();
				console.log(error);
			});
		}
		localStorage.setItem('speakingTestQuestion_'+ that.email, JSON.stringify(that.questions))
	}

	changeTab(e) {
		// console.log(e.heading)
	}
	
	stopRecording() {
		this.recording = false;
		this.finishRecord = true;
		this.record.stop(this.processRecording.bind(this));
	}

	recordAgain() {
		this.finishRecord = false;
		this.questionType = 'last';
	}

	sanitize(url: string) {
		return this.domSanitizer.bypassSecurityTrustUrl(url);
	}
	/**
	 * Start recording.
	 */
	initiateRecording(questionIndex) {
		this.recording = true;
		this.isStopOpen = true;
		this.currentQuestion = this.questions[questionIndex];
		let mediaConstraints = {
			video: false,
			audio: true
		};
		navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
	}
	/**
	 * Will be called automatically.
	 */
	successCallback(stream) {
		var options = {
			mimeType: "audio/wav",
			numberOfAudioChannels: 1,
			sampleRate: 44100,
		};
		//Start Actuall Recording
		var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
		this.record = new StereoAudioRecorder(stream, options);
		this.record.record();
	}
	
	processRecording(blob) {
		this.url = URL.createObjectURL(blob);
		this.formData = new FormData();
		this.formData.append('token', localStorage.getItem('token'));
		this.formData.append('keyword', localStorage.getItem('keyword'));
		this.formData.append('sess', localStorage.getItem('sessionId'));
		this.formData.append('testid', this.testid);
		this.formData.append('topic', "Speaking");
		this.formData.append('id', this.currentQuestion.id);
		this.formData.append('question', this.currentQuestion.question);
		this.formData.append('questiontype', '');
		this.formData.append('audio', blob);
		for(var pair of this.formData.entries()) {
			// console.log(pair);
		}
	}
	/**
	 * Process Error.
	 */
	errorCallback(error) {
		this.error = 'Can not play audio in your browser';
		alert('Can not play audio in your browser');
	}


	onSubmit() {
		
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

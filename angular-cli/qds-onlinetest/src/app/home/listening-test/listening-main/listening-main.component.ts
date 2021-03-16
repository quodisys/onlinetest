import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Track } from 'ngx-audio-player';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-listening-main',
  templateUrl: './listening-main.component.html',
  styleUrls: ['./listening-main.component.scss']
})
export class ListeningMainComponent implements OnInit {

	audioLink1:string;
	audioLink2:string;
	vocabularyTest:any;
	questionPart1: any;
	questionPart2: any;

	listeningTestInfo:any;

	msaapDisplayTitle = false;
	msaapDisplayPlayList = false;
	msaapDisplayVolumeControls = false;
	msaapDisplayArtist = false;
	msaapDisplayDuration = true;
	msaapDisablePositionSlider = false;

	vocabularyForm: any;

	isSticky: boolean = false;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	msaapPlaylist = []

	topic:string
	config = {}
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	submitForm:any

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.topic = 'Listening';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.getQuestion(this.topic);
		this.getTestInfo();
		this.config = {
			leftTime: 1360,
			format: 'mm : ss'
		}
		this.vocabularyForm = {
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
			that.listeningTestInfo = engtest.find(x => x.topic == "Listening Test");
			that.testTime = that.listeningTestInfo.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
			}
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
						type: question.type
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
						type: question.type
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
				let main:Track[] = [
					{title: item.title,
					link: item.audioLink,
					artist: 'Elsa'}
				]
				that.msaapPlaylist.push(main);
			});

			// console.log(that.vocabularyTest);
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
		console.log(this.submitForm);
	}
	  
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.onSubmit();
		}
	}

	onSubmit() {
		let that =  this;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(that.submitForm)
			that.router.navigate(['/listening-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}
}

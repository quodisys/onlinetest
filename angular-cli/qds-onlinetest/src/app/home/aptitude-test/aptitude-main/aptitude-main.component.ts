import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { AptitudeQuestions } from './aptitude-questions'
import { MiQuestions } from './mi-questions'
import { HonestyQuestions } from './honesty-questions'
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-aptitude-main',
  templateUrl: './aptitude-main.component.html',
  styleUrls: ['./aptitude-main.component.scss']
})
export class AptitudeMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	logo:string = ''
	formAnswer: any;
	formAnswerCopy: any;
	formScore: any = {
		qa: [
			{type: "MI - Linguistic", score: 0},
			{type: "MI - Logic", score: 0},
			{type: "MI - Musical", score: 0},
			{type: "MI - Bodily - Kinesthetic", score: 0},
			{type: "MI - Spatial - Visual", score: 0},
			{type: "MI - Interpersonal", score: 0},
			{type: "MI - Intrapersonal", score: 0},
			{type: "Attitude", score: 0},
			{type: "Honesty", score: 0}
		]
	}
	attitudeTest:any
	topic:string;
	submitForm:any;
	formIsSubmit = false;
	testTime:number

	config = {}

	aptitudeQuestions: any[] = AptitudeQuestions;
	miQuestions: any[] = MiQuestions;
	honestyQuestions: any[] = HonestyQuestions;

	constructor(private elementRef: ElementRef, private router: Router, private formBuilder: FormBuilder, private translate: TranslateService) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = 'Aptitude';
		let newMi = []
		let newHonesty = []
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.formAnswer = {
			aptitude: [],
			mi: [],
			honesty: []
		}
		this.aptitudeQuestions.map(item => {
			var d1 = {
				questionID: item.id,
				questionAnswer: '0'
			}
			this.formAnswer.aptitude.push(d1);
		});
		this.miQuestions.map((item, index) => {
			var d1 = {
				id: '0'+index, 
				question: item,
				choices: ['1', '2', '3', '4']
			}
			var d2 = {
				questionID: '0'+index,
				questionAnswer: '0'
			}
			newMi.push(d1);
			this.miQuestions = newMi;
			this.formAnswer.mi.push(d2);
		})
		this.honestyQuestions.map((item, index) => {
			var d1 = {
				id: '0'+index, 
				question: item,
				choices: ['1', '2', '3', '4']
			}
			var d2 = {
				questionID: '0'+index,
				questionAnswer: '0'
			}
			newHonesty.push(d1);
			this.honestyQuestions = newHonesty;
			this.formAnswer.honesty.push(d2);
		})
		this.getTestInfo(this.topic)
		this.config = {
			leftTime: 1800,
			format: 'mm : ss'
		}
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

	getTestInfo(topic) {
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
			that.attitudeTest = test.find( x => x.topic == "Aptitude");
			that.testTime = that.attitudeTest.totaltime*60;
			that.submitForm['subtopic'] = that.attitudeTest.subtopic;
			console.log(that.attitudeTest);
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
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
	
	answerSelect() {
		// console.log(this.formAnswer);
	}

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.submit();
		}
	}

	showNextQuestion(key) {
		this.formAnswerCopy = JSON.parse(JSON.stringify(this.formAnswer));
		let score = 0;
		if(key == 1) {
			this.formAnswerCopy.aptitude.map(q => {
				var a = parseInt(q.questionAnswer)
				q.questionAnswer = a;
				score += q.questionAnswer;
				return score; 
			})
			let index = this.formScore.qa.findIndex(item => item.type == "Attitude");
			this.formScore.qa[index].score = score;
			this.staticTabs.tabs[key].active = true;
			window.scroll(0,0);
			console.log(this.formScore);
		} else if (key == 2) {
			this.formAnswerCopy.mi.map(q => {
				var a = parseInt(q.questionAnswer)
				q.questionAnswer = a;
			})
			let calculator = {
				Linguistic: this.formAnswerCopy.mi[5].questionAnswer
						+ this.formAnswerCopy.mi[7].questionAnswer
						+ this.formAnswerCopy.mi[8].questionAnswer
						+ this.formAnswerCopy.mi[13].questionAnswer
						+ this.formAnswerCopy.mi[22].questionAnswer
						+ this.formAnswerCopy.mi[30].questionAnswer
						+ this.formAnswerCopy.mi[32].questionAnswer
						+ this.formAnswerCopy.mi[49].questionAnswer
						+ this.formAnswerCopy.mi[51].questionAnswer
						+ this.formAnswerCopy.mi[59].questionAnswer,
				
				Logic: this.formAnswerCopy.mi[4].questionAnswer
						+ this.formAnswerCopy.mi[9].questionAnswer
						+ this.formAnswerCopy.mi[10].questionAnswer
						+ this.formAnswerCopy.mi[16].questionAnswer
						+ this.formAnswerCopy.mi[19].questionAnswer
						+ this.formAnswerCopy.mi[28].questionAnswer
						+ this.formAnswerCopy.mi[31].questionAnswer
						+ this.formAnswerCopy.mi[39].questionAnswer
						+ this.formAnswerCopy.mi[48].questionAnswer
						+ this.formAnswerCopy.mi[53].questionAnswer,
				
				Musical: this.formAnswerCopy.mi[1].questionAnswer
						+ this.formAnswerCopy.mi[3].questionAnswer
						+ this.formAnswerCopy.mi[12].questionAnswer
						+ this.formAnswerCopy.mi[17].questionAnswer
						+ this.formAnswerCopy.mi[24].questionAnswer
						+ this.formAnswerCopy.mi[29].questionAnswer
						+ this.formAnswerCopy.mi[38].questionAnswer
						+ this.formAnswerCopy.mi[50].questionAnswer
						+ this.formAnswerCopy.mi[63].questionAnswer
						+ this.formAnswerCopy.mi[65].questionAnswer,
				
				BodilyKinesthetic: this.formAnswerCopy.mi[2].questionAnswer
						+ this.formAnswerCopy.mi[6].questionAnswer
						+ this.formAnswerCopy.mi[14].questionAnswer
						+ this.formAnswerCopy.mi[21].questionAnswer
						+ this.formAnswerCopy.mi[33].questionAnswer
						+ this.formAnswerCopy.mi[37].questionAnswer
						+ this.formAnswerCopy.mi[41].questionAnswer
						+ this.formAnswerCopy.mi[44].questionAnswer
						+ this.formAnswerCopy.mi[46].questionAnswer
						+ this.formAnswerCopy.mi[52].questionAnswer,
				
				SpatialVisual: this.formAnswerCopy.mi[20].questionAnswer
						+ this.formAnswerCopy.mi[23].questionAnswer
						+ this.formAnswerCopy.mi[25].questionAnswer
						+ this.formAnswerCopy.mi[36].questionAnswer
						+ this.formAnswerCopy.mi[43].questionAnswer
						+ this.formAnswerCopy.mi[47].questionAnswer
						+ this.formAnswerCopy.mi[58].questionAnswer
						+ this.formAnswerCopy.mi[60].questionAnswer
						+ this.formAnswerCopy.mi[66].questionAnswer
						+ this.formAnswerCopy.mi[67].questionAnswer,

				Interpersonal: this.formAnswerCopy.mi[18].questionAnswer
						+ this.formAnswerCopy.mi[26].questionAnswer
						+ this.formAnswerCopy.mi[35].questionAnswer
						+ this.formAnswerCopy.mi[42].questionAnswer
						+ this.formAnswerCopy.mi[45].questionAnswer
						+ this.formAnswerCopy.mi[61].questionAnswer
						+ this.formAnswerCopy.mi[62].questionAnswer
						+ this.formAnswerCopy.mi[64].questionAnswer
						+ this.formAnswerCopy.mi[69].questionAnswer,
				Intrapersonal: this.formAnswerCopy.mi[0].questionAnswer
						+ this.formAnswerCopy.mi[11].questionAnswer
						+ this.formAnswerCopy.mi[15].questionAnswer
						+ this.formAnswerCopy.mi[27].questionAnswer
						+ this.formAnswerCopy.mi[34].questionAnswer
						+ this.formAnswerCopy.mi[40].questionAnswer
						+ this.formAnswerCopy.mi[54].questionAnswer
						+ this.formAnswerCopy.mi[55].questionAnswer
						+ this.formAnswerCopy.mi[56].questionAnswer
						+ this.formAnswerCopy.mi[68].questionAnswer
				
			}
			
			let LinguisticIndex = this.formScore.qa.findIndex(item => item.type == "MI - Linguistic");
			let LogicIndex = this.formScore.qa.findIndex(item => item.type == "MI - Logic");
			let MusicalIndex = this.formScore.qa.findIndex(item => item.type == "MI - Musical");
			let BodilyKinestheticIndex = this.formScore.qa.findIndex(item => item.type == "MI - Bodily - Kinesthetic");
			let SpatialVisualIndex = this.formScore.qa.findIndex(item => item.type == "MI - Spatial - Visual");
			let MIInterpersonalIndex = this.formScore.qa.findIndex(item => item.type == "MI - Interpersonal");
			let MIIntrapersonalIndex = this.formScore.qa.findIndex(item => item.type == "MI - Intrapersonal");


			this.formScore.qa[LinguisticIndex].score = calculator.Linguistic;
			this.formScore.qa[LogicIndex].score = calculator.Logic;
			this.formScore.qa[MusicalIndex].score = calculator.Musical;
			this.formScore.qa[BodilyKinestheticIndex].score = calculator.BodilyKinesthetic;
			this.formScore.qa[SpatialVisualIndex].score = calculator.SpatialVisual;
			this.formScore.qa[MIInterpersonalIndex].score = calculator.Interpersonal;
			this.formScore.qa[MIIntrapersonalIndex].score = calculator.Intrapersonal;

			this.staticTabs.tabs[key].active = true;
			window.scroll(0,0);
			console.log(this.formScore);
		} else if (key == 'submit') {
			this.formAnswerCopy.honesty.map(q => {
				var a = parseInt(q.questionAnswer)
				q.questionAnswer = a;
				score += q.questionAnswer;
				return score; 
			})
			let index = this.formScore.qa.findIndex(item => item.type == "Honesty");
			this.formScore.qa[index].score = score;
			this.submit();
		}
	}

	changeTab(e) {
		console.log(e.heading)
	}

	submit() {
		let that =  this;
		this.submitForm.qa = this.formScore.qa;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			console.log(response)
			that.formIsSubmit = true;
			that.router.navigate(['/aptitude-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
		console.log(this.submitForm);
	}
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-technical-main',
  templateUrl: './technical-main.component.html',
  styleUrls: ['./technical-main.component.scss']
})
export class TechnicalMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild(ConfirmModalComponent, {static: false}) private ConfirmModalComponent: ConfirmModalComponent;
	logo:string=''
	topic:string
	subtopic:string
	config = {}
	technicalTest:any
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	submitDisable = true;
	loading:boolean = false

	submitForm:any
	formIsSubmit = false;

	constructor(private elementRef: ElementRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
		
	}

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.topic = '';
		this.subtopic = '';
		this.route.queryParams.subscribe(params => {
			this.topic = params['topic'];
		});
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.config = {
			leftTime: 1800,
			format: 'mm : ss'
		}
		this.getTestInfo(this.topic)
		this.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
	}
	canDeactivate() {
		if(!this.formIsSubmit) {
			return confirm('Are you sure you want to leave this test ?');
		} else {
			return true
		}
	}

	openModal() {
		this.ConfirmModalComponent.showModal();
		return false;
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
			that.technicalTest = test.find( x => x.topic == "Technical");
			that.technicalTest = that.technicalTest.techtests;
			that.technicalTest = Object.keys(that.technicalTest).map((k) => that.technicalTest[k]);
			var topicaa = that.technicalTest.find(x => x.topic == topic);
			that.topic = topicaa.topic
			that.subtopic = topicaa.subtopic
			that.testTime = topicaa.totaltime*60;
			that.config = {
				leftTime: that.testTime,
				format: 'mm : ss'
			}
			that.getQuestion(that.topic);
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
					answers: []
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
			console.log(that.questions);
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
		}
		if(this.submitForm.qa.slice(-1)[0].answer != '') {
			this.submitDisable = false;
		}
	}

	counterEvent(e: CountdownEvent) {
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
			},500)
		}
	}

	changeTab(e) {
		// console.log(e.heading)
	}

	onSubmit() {
		let that =  this;
		this.loading = true
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/processtests.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			that.formIsSubmit = true;
			that.loading = false
			that.router.navigate(['/technical-test/result'])
		})
		.catch(function (error) {
			console.log(error);
			alert("Something wrong when submitting test!")
		});
	}
}

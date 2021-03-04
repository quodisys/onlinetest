import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-technical-main',
  templateUrl: './technical-main.component.html',
  styleUrls: ['./technical-main.component.scss']
})
export class TechnicalMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	formAnswer: IQTestForm;
	topic:string
	config = {}
	questions:any = []

	constructor(private elementRef: ElementRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.getQuestion();
		this.formAnswer = {
			answers: [
				{
					questionID: '',
					questionAnswer: ''
				}
			]
		}
		this.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
		this.config = {
			leftTime: 1160,
			format: 'mm : ss'
		}
	}

	getQuestion() {
		let that =  this;
		let topic = '';
		this.route.queryParams.subscribe(params => {
			topic = params['topic'];
		});
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
			that.questions = response.data;
			that.questions[0].active = true;
			console.log(that.questions);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/technical-test/result'])
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

	onSubmit(formData) {
		console.log(formData.value);
		console.log(this.formAnswer)
		this.router.navigate(['/technical-test/result'])
	}

}

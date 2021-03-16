import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-speaking-main',
  templateUrl: './speaking-main.component.html',
  styleUrls: ['./speaking-main.component.scss']
})
export class SpeakingMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

	formAnswer: IQTestForm;

	recording: Boolean = false;

	finishRecord:boolean = false;

	config = {}
	questions: any[] = [
		{ 
			id: '001', 
			question: 'I have experience managing and leading a large team.',
			active: true 
		},
		{ 
			id: '002', 
			question: 'This job is a good fit for what I’ve been doing throughout my career.',
		},
		{ 
			id: '003', 
			question: 'A resume is a written document that includes work experience, education, and skills.',
		},
		{ 
			id: '004', 
			question: 'Conflict resolution is an essential part of teamwork.',
		},
		{ 
			id: '005', 
			question: 'We will get it resolved as quickly as possible.',
		},
		{ 
			id: '006', 
			question: 'Unfortunately, I would need my manager’s approval for that request. May I transfer your call?',
		},
		{ 
			id: '007', 
			question: 'We acquired five thousand new customers this quarter, which is 20% more than last quarter.',
		},
		{ 
			id: '008', 
			question: 'Your HR director mentioned that productivity is an area you want to focus on next year.',
		},
		{ 
			id: '009', 
			question: 'We offer a real-time product management tool with automated alerts.'
		},
		{ 
			id: '009', 
			question: 'Most of our clients set up bank transfers, but we can accommodate any payment method.'
		},
		{ 
			id: '009', 
			question: 'Thanks for meeting us on short notice. We’re experiencing difficulties using your product.'
		},
		{ 
			id: '009', 
			question: 'Some companies have trouble finding qualified applicants for jobs that require technical skills.'
		},
		{ 
			id: '009', 
			question: 'I’m interested in selling your products at our authorized stores.'
		},
		{ 
			id: '009', 
			question: 'Being an entrepreneur requires a good idea, passion, and a willingness to work hard.'
		},
		{ 
			id: '009', 
			question: 'There are three types of business organizations: for-profit, non-profit, and hybrids.'
		}
	];

	constructor(private elementRef: ElementRef, private router: Router, private formBuilder: FormBuilder) { }


	ngOnInit(): void {
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

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/speaking-test/result'])
		}
	}

	showNextQuestion(key, last, formData) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.questions.length;
		that.questions[key].customClass = 'done'
		if(tabId < questionCount) {
			setTimeout(function() {
				that.staticTabs.tabs[tabId].active = true;
			},500)
		}
		this.finishRecord = false;
		if(last) {
			this.onSubmit(formData);
		}
	}

	changeTab(e) {
		console.log(e.heading)
	}

	startRecording() {
		this.recording = true;
	}
	
	stopRecording(key, last, formData) {
		this.recording = false;
		this.finishRecord = true;
		// if(last) {
		// 	this.onSubmit(formData);
		// } else {
		// 	this.showNextQuestion(key);
		// }
	}

	recordAgain() {
		this.finishRecord = false;
	}


	onSubmit(formData) {
		console.log(formData.value);
		console.log(this.formAnswer)
		this.router.navigate(['/speaking-test/result'])
	}
}

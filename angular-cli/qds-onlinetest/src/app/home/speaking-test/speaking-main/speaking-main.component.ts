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


	config = {}
	questions: any[] = [
		{ 
			id: '001', 
			question: 'Why do some people like to go to big shopping malls and some like small shops?',
			choices: ['25', '.5', '1', '10'],
			active: true 
		},
		{ 
			id: '002', 
			question: 'She sells seashells by the seashore',
			choices: ['True', 'False'],
		},
		{ 
			id: '003', 
			question: 'This summer I will visit a new country with two of my best friends.',
			choices: ['37', '45', '43', '39', '49'],
		},
		{ 
			id: '004', 
			question: 'She sells seashells by the seashore',
			choices: ['Eel', 'Shark', 'Dolphin', 'Swordfish', 'Turtle'],
		},
		{ 
			id: '005', 
			question: 'If you rearrange the letters of "ahret," you would have the name of a:',
			choices: ['Ventricle', 'Fish', 'River', 'Planet', 'Country'],
		},
		{ 
			id: '006', 
			question: 'Which is the largest number?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '007', 
			question: 'Which number has the smallest value?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '008', 
			question: 'What will you get if you reduce 14/35 to the lowest term?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '009', 
			question: 'Helpless and Legend have ____ meanings.',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
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
		console.log(e.heading)
	}

	startRecording() {
		this.recording = true;
	}
	
	stopRecording(key, last, formData) {
		this.recording = false;
		if(last) {
			this.onSubmit(formData);
		} else {
			this.showNextQuestion(key);
		}
	}

	onSubmit(formData) {
		console.log(formData.value);
		console.log(this.formAnswer)
		this.router.navigate(['/speaking-test/result'])
	}

}

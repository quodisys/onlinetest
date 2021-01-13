import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { IQTestForm } from '../../../interfaces/iq-test'
import { FormBuilder} from  '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aptitude-main',
  templateUrl: './aptitude-main.component.html',
  styleUrls: ['./aptitude-main.component.scss']
})
export class AptitudeMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

	formAnswer: IQTestForm;


	config = {}
	questions: any[] = [
		{ 
			id: '001', 
			question: 'What number is one quarter of one tenth of one fifth of 200?',
			choices: ['25', '.5', '1', '10'],
			active: true 
		},
		{ 
			id: '002', 
			question: 'A palindrome is a word or phrase that is spelled the same written forward or backward, often used for I.Q. test questions. "Stets" is a palindrome.',
			choices: ['True', 'False'],
		},
		{ 
			id: '003', 
			question: 'Sequential reasoning is often tested in IQ exams. 3, 7, 13, 21, 31. What number comes next in the sequence?',
			choices: ['37', '45', '43', '39', '49'],
		},
		{ 
			id: '004', 
			question: 'Compare and contrast or classification problems are commonly used to measure intelligence. Which of the five is least like the other four?',
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
			this.router.navigate(['/aptitude-test/result'])
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

	onSubmit(formData) {
		console.log(formData.value);
		console.log(this.formAnswer)
		this.router.navigate(['/aptitude-test/result'])
	}

}

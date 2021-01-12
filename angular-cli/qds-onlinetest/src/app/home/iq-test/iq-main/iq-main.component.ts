import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iq-main',
  templateUrl: './iq-main.component.html',
  styleUrls: ['./iq-main.component.scss']
})
export class IqMainComponent implements OnInit {

	IQTestForm: FormGroup;
	config = {}
	questions: any[] = [
		{ 
			id: '001', 
			question: 'Which number should come next in the pattern?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
			active: true 
		},
		{ 
			id: '002', 
			question: 'Book is to Reading as Fork is to:',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '003', 
			question: 'Which of the following can be arranged into a 5-letter English word?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '004', 
			question: 'What number best completes the analogy:',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
		},
		{ 
			id: '005', 
			question: 'What Does FAQ stand for?',
			choices: ['Awnser A', 'Awnser B', 'Awnser C', 'Awnser D'],
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
		this.config = {
			leftTime: 1160,
			format: 'mm : ss'
		}
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/iq-test/result'])
		}
	}

	onSubmit() {
		console.log(this.IQTestForm.value);
	}
}

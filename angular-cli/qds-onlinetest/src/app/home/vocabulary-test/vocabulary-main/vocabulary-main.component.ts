import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent implements OnInit {

	vocabularyForm: any;

	config = {}

	vocabularyTest: any = {
		questions: [
			{ 
				id: '001', 
				question: 'Why people attend colleges or universities?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
				active: true 
			},
			{ 
				id: '002', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '003', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '004', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '005', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '006', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '007', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '008', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '009', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			},
			{ 
				id: '010', 
				question: 'Why the current society and its educational structures are far different than they had been a century back?',
				choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
			}
		]
	}

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.config = {
			leftTime: 360,
			format: 'mm : ss'
		}
		this.vocabularyForm = {
			answers : []
		}
	}
	  
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/vocabulary-test/result'])
		}
	}

	onSubmit(testForm) {
		console.log(testForm.value);
		this.router.navigate(['/vocabulary-test/result'])
	}

}

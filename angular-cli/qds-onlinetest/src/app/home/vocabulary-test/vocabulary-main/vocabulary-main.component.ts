import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IQTestForm } from '../../../interfaces/iq-test';

@Component({
  selector: 'app-vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent implements OnInit {

	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	formAnswer: IQTestForm;
	vocabularyForm: any;

	config = {}

	vocabularyTest: any = {
		questions: [
			{ 
				id: '001', 
				question: 'Unfortunately, we’ll need to ________ our product manager. He never finishes tasks on time and his performance is really poor.',
				choices: ['fire', 'make redundant', 'hire'],
				active: true 
			},{ 
				id: '002', 
				question: 'I’m so happy we can work from home. I used to spend an hour a day on ________ .',
				choices: ['waiting', 'commuting', 'travelling']
			},{ 
				id: '002', 
				question: 'What does the term CEO stand for?',
				choices: ['Chef Executive Officer', 'Chief Executive Officer', 'Chief Execution Officer']
			},{ 
				id: '002', 
				question: 'Our company’s headquarters is in the States, but we have four ________ in Asia as well.',
				choices: ['branches', 'sites', 'office']
			},{ 
				id: '002', 
				question: 'I think I’m falling behind on my tasks. Can you please give me some tips on how to ________ deadlines and finish tasks on time?',
				choices: ['achieve', 'get', 'meet']
			},{ 
				id: '002', 
				question: '	________-solving skills help you to resolve problems effectively and successfully deal with challenging situations.',
				choices: ['Issue', 'Problem', 'Key']
			},{ 
				id: '002', 
				question: 'Next Friday you need to go on a business ________ to meet some new clients.',
				choices: ['journey', 'travel', 'trip']
			},{ 
				id: '002', 
				question: 'If you work ________ it means you work beyond your normal working hours.',
				choices: ['aftertime', 'overtime', 'more time']
			},{ 
				id: '002', 
				question: 'I did an ________ while studying to gain more work experience.',
				choices: ['internship', 'opportunity', 'employment']
			},{ 
				id: '002', 
				question: 'Please, kindly send us a price ________ for the attached order by the end of the week.',
				choices: ['list', 'quote', 'scheme']
			},{ 
				id: '002', 
				question: 'Tonight I’ll attend a ________ event to meet some potential new clients and make some new connections.',
				choices: ['marketing', 'networking', 'business']
			},{ 
				id: '002', 
				question: 'We need a volunteer to take ________ of this meeting. We need to keep track of any important points.',
				choices: ['points', 'minutes', 'ideas']
			},{ 
				id: '002', 
				question: 'A sales ________ is an overview of all sales activities in a company.',
				choices: ['report', 'presentation', 'statement']
			},{ 
				id: '002', 
				question: 'I’m sorry. Your TV is no longer under ________, so you’ll have to pay for the repairs.',
				choices: ['protection', 'insurance', 'warranty']
			},{ 
				id: '002', 
				question: 'The interest ________ is the amount of money you are charged for borrowing money.',
				choices: ['price', 'fee', 'rate']
			},{ 
				id: '002', 
				question: 'If you want to spend money on your marketing campaign, you need to ask your manager for a budget ________.',
				choices: ['approval', 'permit', 'estimation']
			},{ 
				id: '002', 
				question: 'Please remember that the dress ________ for our meeting is business casual.',
				choices: ['style', 'code', 'clothes']
			},{ 
				id: '002', 
				question: 'Our accountant just had a baby, so she’s on maternity ________. She’ll be back at work in six months.',
				choices: ['leave', 'break', 'pause']
			},{ 
				id: '002', 
				question: 'Nowadays, more and more people are buying and selling products online. ________ is growing exponentially!',
				choices: ['E-sales', 'E-business', 'E-commerce']
			},{ 
				id: '002', 
				question: 'Just to let you know, we’re giving a ________ to our business development manager. Starting next month, he’ll be in charge of global market expansion.',
				choices: ['raise', 'promotion', 'bonus']
			},{ 
				id: '002', 
				question: 'Customer ________ keeps us informed about the satisfaction rate of our customers. It tells us if they are happy with our services or not.',
				choices: ['opinion', 'response', 'feedback']
			},{ 
				id: '002', 
				question: 'There’s no doubt Jack will be the ________ of the year. He always goes the extra mile, and he has really exceeded all our expectations. I’ve never seen anyone work this hard!',
				choices: ['employee', 'employer', 'worker']
			},{ 
				id: '002', 
				question: 'Your proposal sounds interesting, but my manager is currently on vacation. Let’s ________ base in two weeks when she’s back.',
				choices: ['touch', 'check', 'talk']
			},{ 
				id: '002', 
				question: 'We’d like to move forward with the project, but the ultimate decision resides with the ________ of directors.',
				choices: ['group', 'board', 'committee']
			},{ 
				id: '002', 
				question: 'We just got the approval from our manager to start with the new branding campaign. Let’s get the ball ________!',
				choices: ['moving', 'rolling', 'forward']
			},{ 
				id: '002', 
				question: 'We will announce our new product ________ next month at the tech conference.',
				choices: ['launch', 'lunch', 'launching']
			},{ 
				id: '002', 
				question: 'Unfortunately, we couldnt come to a compromise. After almost one month of negotiations, we are back to ________ one.',
				choices: ['round', 'place', 'square']
			},{ 
				id: '002', 
				question: '	Next time you want to arrange a meeting can you please let me know at least a day in advance? I can’t always make it on such ________ notice.',
				choices: ['quick', 'urgent', 'short']
			},{ 
				id: '002', 
				question: 'I finally got a new job! It’s only for six months, so I’ll be given a short-________ contract, but at least I’m not unemployed anymore.',
				choices: ['period', 'term', 'time']
			},{ 
				id: '002', 
				question: 'Managers are people who are in charge of ________ a business.',
				choices: ['doing', 'running', 'making']
			},{ 
				id: '002', 
				question: 'There are many cases where a profitable business goes bankrupt because of ________-flow problems.',
				choices: ['money', 'debt', 'cash']
			},{ 
				id: '002', 
				question: 'I think I’ll ________ in our new English communication course. The course will be held every Friday from nine to eleven a.m. in the meeting room.',
				choices: ['enroll', 'get', 'register']
			},{ 
				id: '002', 
				question: '	Many sales people use ________ calling techniques to find new prospects, connect with them, and find out what their needs are.',
				choices: ['fast', 'cold', 'warm']
			},{ 
				id: '002', 
				question: 'Marketing managers need to be very creative. They need to think outside the ________ to create successful marketing strategies.',
				choices: ['mind', 'box', 'plan']
			},{ 
				id: '002', 
				question: 'Contracts are not really my area of ________. You should look into this with our legal team.',
				choices: ['expertise', 'knowledge', 'experience']
			},{ 
				id: '002', 
				question: 'Can you please send us the ________, so we can proceed with the payment for the products we ordered last week? We’ll pay via bank transfer.',
				choices: ['receipt', 'bill', 'invoice']
			},{ 
				id: '002', 
				question: 'Did you hear our chief accountant just ________? He decided to open his own business. We need to start looking for a new one ASAP.',
				choices: ['fired', 'resigned', 'retired']
			},{ 
				id: '002', 
				question: 'We’re happy to announce our company has made its first ________, we’re now the proud owners of the software company AS.TT.',
				choices: ['purchase', 'acquisition', 'buy-in']
			},{ 
				id: '002', 
				question: '	Gross ________ is the amount of money a company makes after subtracting costs associated with making the product or providing the service.',
				choices: ['salary', 'income', 'profit']
			},{ 
				id: '002', 
				question: 'Our sales ________ for Q1 looks promising. Hopefully, we’ll achieve what we’re aiming for.',
				choices: ['foretell', 'forecast', 'foreclose']
			}
		]
	}

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.formAnswer = {
			answers: [
				{
					questionID: '',
					questionAnswer: ''
				}
			]
		}
		this.vocabularyTest.questions.map(item => {
			item['customClass'] = '';
			console.log(item)
		})
		this.config = {
			leftTime: 360,
			format: 'mm : ss'
		}
	}
	  
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/vocabulary-test/result'])
		}
	}

	showNextQuestion(key) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.vocabularyTest.questions.length;
		that.vocabularyTest.questions[key].customClass = 'done'
		if(tabId < questionCount) {
			setTimeout(function() {
				that.staticTabs.tabs[tabId].active = true;
			},500)
		}
	}

	changeTab(e) {
		console.log(e.heading)
	}

	onSubmit(testForm) {
		console.log(testForm.value);
		this.router.navigate(['/vocabulary-test/result'])
	}

}

import { Component, OnInit } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-main',
  templateUrl: './reading-main.component.html',
  styleUrls: ['./reading-main.component.scss']
})
export class ReadingMainComponent implements OnInit {

	readingForm: any;

	config = {}

	readingTest: any = {
		reading: `People primarily enrol in a college or university to achieve the necessary education and degree they require to build a career. Apart from the career, people seek higher studies to gain knowledge, to enhance social status and learn more about diverse cultures.
		<br><br>
		The current society and its educational structures are far different than they had been a century back when a self-educated person could gain a good career and parents could arrange private tutors to ensure their children’s education. But in today’s world, universities are the authority to declare a person to have the necessary education to be ready for the job. People are going to universities because this is the most common way of getting the education. The sole purpose of a college or university is to ensure the proper theoretical and moral education to build the ideal citizens the country needs and this is the system which is unquestionably accepted by the society. People who do not have the plan to use their certificate to get a job either because they have other career plans or may be blessed with inherited fortune. <br><br>
		Many go to these educational institutes to learn values, gather ideas and education they require to be good humans. In fact, education is a borderline between a savage person and a good man and this is another reason the society has adopted the idea of education for all.
		<br><br>
		Some people go to universities to get further education to enhance their horizon or to improve their job position and salary. Others go to the colleges and universities to let the world know that they are educated. Funny this may seem but many people simply consider the higher education as the status they require to get a higher position in the society.`,
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
		this.readingForm = {
			answers : []
		}
	}

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/reading-test/result'])
		}
	}

	onSubmit(testForm) {
		console.log(testForm.value);
		this.router.navigate(['/reading-test/result'])
	}

}

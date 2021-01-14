import { Component, OnInit } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-main',
  templateUrl: './reading-main.component.html',
  styleUrls: ['./reading-main.component.scss']
})
export class ReadingMainComponent implements OnInit {

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
		]
	}

	

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.config = {
			leftTime: 130,
			format: 'mm : ss'
		}
	}

	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/reading-test/result'])
		}
	}

	onSubmit(testForm) {
		console.log(testForm)
	}

}

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Track } from 'ngx-audio-player';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-listening-main',
  templateUrl: './listening-main.component.html',
  styleUrls: ['./listening-main.component.scss']
})
export class ListeningMainComponent implements OnInit {

	msaapDisplayTitle = false;
	msaapDisplayPlayList = false;
	msaapDisplayVolumeControls = false;
	msaapDisplayArtist = false;
	msaapDisplayDuration = true;
	msaapDisablePositionSlider = false;

	vocabularyForm: any;

	isSticky: boolean = false;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	vocabularyTest:any = [
		{
			audioLink: "https://onlinetest.elsaspeak.com/questions/20210120050423-listening-1.mp3",
			title: "Listen to Audio 1 and answer questions 1-10",
			questions: [
				{ 
					id: '001', 
					question: 'The speaker will tell us what entrepreneurship is and will talk about vocabulary and ________ related to entrepreneurship.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					active: true,
					type: 'text'
				},
				{ 
					id: '002', 
					question: 'Additionally, she’ll make a comparison between entrepreneurs and small business ________.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '003', 
					question: 'What is entrepreneurship?',
					choices: ['It is a startup business.', 'It is the activity of setting up a new business.', 'It is a purchase of a new business.'],
					type: 'select'
				},
				{ 
					id: '004', 
					question: 'Entrepreneurs need to be passionate, be hard-working, and possess many business ________.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '005', 
					question: 'In which order the speaker discusses the topics?',
					choices: ['Investment, Initial idea, Implementation', 'Initial idea, Investment, Implementation', 'Implementation, Initial idea, Investment', 'Implementation, Investment, Initial idea', 'Investment, Implementation, Initial idea'],
					type: 'select'
				},
				{ 
					id: '006', 
					question: 'Every entrepreneur has a different ________ style.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '007', 
					question: 'What is a day-to-day operation?',
					choices: ['Activities that are happening every day at a company to generate profit', 'Everyday activities and hobbies of employees', 'Daily work and life routines'],
					type: 'select'
				},
				{ 
					id: '008', 
					question: 'Which of the following is not one of Elon Musk’s strengths?',
					choices: ['Strategic thinking', 'Sales and finance', 'Coming up with new ideas'],
					type: 'select'
				},
				{ 
					id: '009', 
					question: 'Small business owners ...',
					choices: ['...work hard to make their businesses grow as fast as possible.', '...are focused on stability, rather than growth.', '...aren’t very good at day-to-day operations.'],
					type: 'select'
				},
				{ 
					id: '010', 
					question: 'Both small business owners and entrepreneurs are equally important to ________ development.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '011', 
					question: 'According to the audio, what is the definition of economic development?',
					choices: ['The act of gaining and spending money', 'Making sure every person has a job', 'The process of improving the quality of people’s lives'],
					type: 'select'
				},
				{ 
					id: '012', 
					question: 'A startup is a business that didn’t ________ before.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '013', 
					question: 'Entrepreneurship is a good ________ to deal with the unemployment crisis.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '014', 
					question: 'The job of a supplier is to ________ products and services to another entity.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '015', 
					question: 'Which of the following statements is not true:',
					choices: ['Entrepreneurship leads to innovation, which leads to access to resources.', 'Entrepreneurship only helps economic development by creating jobs.', 'Entrepreneurship, innovation, and economic growth are connected.'],
					type: 'select'
				},
				{ 
					id: '016', 
					question: 'In rural Africa, people now have access to ________ thanks to their smartphones.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '017', 
					question: 'Thanks to smartphones, people can now make ________ and efficient money transfers.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '018', 
					question: 'Which of the following is another example of innovation that led to better use of resources?',
					choices: ['Car engines', 'Petrol stations', 'Gas tanks'],
					type: 'select'
				},
				{ 
					id: '019', 
					question: 'Apart from creating jobs and innovation, entrepreneurship also increases:',
					choices: ['Poverty', 'Government activities', 'Private funding'],
					type: 'select'
				},
				{ 
					id: '020', 
					question: 'What was the purpose of this passage?',
					choices: ['To explain how entrepreneurship helps economic development.', 'To talk about the advantages of entrepreneurship.', 'To convince people to become entrepreneurs.'],
					type: 'select'
				}
			]
		},
		{
			audioLink: "https://onlinetest.elsaspeak.com/questions/20210120050423-listening-2.mp3",
			title: "Listen to Audio 2 and answer questions 11-20",
			questions: [
				{ 
					id: '001', 
					question: 'The speaker will tell us what entrepreneurship is and will talk about vocabulary and ________ related to entrepreneurship.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					active: true,
					type: 'text'
				},
				{ 
					id: '002', 
					question: 'Additionally, she’ll make a comparison between entrepreneurs and small business ________.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '003', 
					question: 'What is entrepreneurship?',
					choices: ['It is a startup business.', 'It is the activity of setting up a new business.', 'It is a purchase of a new business.'],
					type: 'select'
				},
				{ 
					id: '004', 
					question: 'Entrepreneurs need to be passionate, be hard-working, and possess many business ________.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '005', 
					question: 'In which order the speaker discusses the topics?',
					choices: ['Investment, Initial idea, Implementation', 'Initial idea, Investment, Implementation', 'Implementation, Initial idea, Investment', 'Implementation, Investment, Initial idea', 'Investment, Implementation, Initial idea'],
					type: 'select'
				},
				{ 
					id: '006', 
					question: 'Every entrepreneur has a different ________ style.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '007', 
					question: 'What is a day-to-day operation?',
					choices: ['Activities that are happening every day at a company to generate profit', 'Everyday activities and hobbies of employees', 'Daily work and life routines'],
					type: 'select'
				},
				{ 
					id: '008', 
					question: 'Which of the following is not one of Elon Musk’s strengths?',
					choices: ['Strategic thinking', 'Sales and finance', 'Coming up with new ideas'],
					type: 'select'
				},
				{ 
					id: '009', 
					question: 'Small business owners ...',
					choices: ['...work hard to make their businesses grow as fast as possible.', '...are focused on stability, rather than growth.', '...aren’t very good at day-to-day operations.'],
					type: 'select'
				},
				{ 
					id: '010', 
					question: 'Both small business owners and entrepreneurs are equally important to ________ development.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '011', 
					question: 'According to the audio, what is the definition of economic development?',
					choices: ['The act of gaining and spending money', 'Making sure every person has a job', 'The process of improving the quality of people’s lives'],
					type: 'select'
				},
				{ 
					id: '012', 
					question: 'A startup is a business that didn’t ________ before.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '013', 
					question: 'Entrepreneurship is a good ________ to deal with the unemployment crisis.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '014', 
					question: 'The job of a supplier is to ________ products and services to another entity.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '015', 
					question: 'Which of the following statements is not true:',
					choices: ['Entrepreneurship leads to innovation, which leads to access to resources.', 'Entrepreneurship only helps economic development by creating jobs.', 'Entrepreneurship, innovation, and economic growth are connected.'],
					type: 'select'
				},
				{ 
					id: '016', 
					question: 'In rural Africa, people now have access to ________ thanks to their smartphones.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '017', 
					question: 'Thanks to smartphones, people can now make ________ and efficient money transfers.',
					choices: ['University degree nowadays is mandatory to apply for a good job.', 'This is the most common and perhaps the only method nowadays to enhance our knowledge and skills.', 'Becoming familiar with the latest technology, including computer, digital systems, or medicine.', 'To improve their social skills by meeting more educated people.'],
					type: 'text'
				},
				{ 
					id: '018', 
					question: 'Which of the following is another example of innovation that led to better use of resources?',
					choices: ['Car engines', 'Petrol stations', 'Gas tanks'],
					type: 'select'
				},
				{ 
					id: '019', 
					question: 'Apart from creating jobs and innovation, entrepreneurship also increases:',
					choices: ['Poverty', 'Government activities', 'Private funding'],
					type: 'select'
				},
				{ 
					id: '020', 
					question: 'What was the purpose of this passage?',
					choices: ['To explain how entrepreneurship helps economic development.', 'To talk about the advantages of entrepreneurship.', 'To convince people to become entrepreneurs.'],
					type: 'select'
				}
			]
		}
	]


	// Material Style Advance Audio Player Playlist
	// msaapPlaylist: Track[] = [
	// 	{
	// 	  title: 'Audio 1',
	// 	  link:
	// 		'https://onlinetest.elsaspeak.com/questions/20210120050423-listening-1.mp3',
	// 	  artist: 'Elsa'
	// 	}
	// ];

	msaapPlaylist = []

	topic:string
	config = {}
	testTime:number
	questions:any = []
	questionsOrinal:any = []
	submitForm:any

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.topic = 'Listening';
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			qa: []
		}
		this.getQuestion(this.topic);
		this.config = {
			leftTime: 360,
			format: 'mm : ss'
		}
		this.vocabularyForm = {
			answers : []
		}
		this.vocabularyTest.forEach(item => {
			let main:Track[] = [
				{title: item.title,
				link: item.audioLink,
				artist: 'Elsa'}
			]
			this.msaapPlaylist.push(main);
		});
		console.log(this.msaapPlaylist)
	}

	getQuestion(topic) {
		let that =  this;
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
			that.questionsOrinal = response.data;
			console.log(that.questionsOrinal)
			// that.questionsOrinal.map((item, index) => {
			// 	var d1 = {
			// 		id: item.id,
			// 		question: item.question,
			// 		type: item.type,
			// 		answers: []
			// 	}
			// 	var d2 = {
			// 		id: parseInt(item.id),
			// 		answer: ''
			// 	}
			// 	that.questions.push(d1);
			// 	that.submitForm.qa.push(d2);
			// 	item.answers.map((el, i) => {
			// 		var alpha = (i+10).toString(36).toUpperCase();
			// 		var data = {
			// 			alphabet: alpha,
			// 			answer: el
			// 		}
			// 		that.questions[index].answers.push(data);
			// 	});	
			// });
			// that.questions[0]['active'] = true;
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	  
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/listening-test/result'])
		}
	}

	onSubmit(testForm) {
		console.log(testForm.value);
		this.router.navigate(['/listening-test/result'])
	}

}

import { Component, OnInit, HostListener } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-main',
  templateUrl: './reading-main.component.html',
  styleUrls: ['./reading-main.component.scss']
})
export class ReadingMainComponent implements OnInit {

	readingForm: any;
	isSticky: boolean = false;

	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}

	config = {}

	readingTest: any = {
		reading: `The commute time is zero. The dress code is relaxed. And, if you’d like, you can move across the country (or the world) tomorrow without having to change jobs. 
		
		<br><br>

		There has been a meteoric rise in the number of white collar employees working from home this past year. While the COVID-19 pandemic catalyzed the shift away from the office for many companies, interest in a distributed workforce predates recent global health concerns, enabled by improving communication technology and driven by employee demands, real estate costs, and other factors. But the dramatic adoption of this radically new way of working has revealed that working from home may not be working for everyone.

		<br><br>
		[ blank 1 ]
		<br><br>
		
		At first glance, the benefits of working from home seem obvious for employees and employers alike. Employees are freed from sometimes arduous commutes, while employers don’t need to shell out exorbitant rents for city office space. Indeed, one 2017 study found that, on average, the ability to work from home was worth an 8% decrease in salary. For their parts, employers without permanent offices to maintain are happy to spend big on annual company retreats to luxurious resorts or even provide remote employees monthly stipends for coworking space fees.

		<br><br>
		
		Such nontraditional work arrangements have proven to be a boon for some companies in terms of recruiting and retaining top talent, both because some employees expect the freedom that comes with working from home and because it drastically reduces — if not outright eliminates — the geographic constraints of the recruiting pool. Why limit yourself to the talent available in one city, proponents argue, when you can get the best the entire world has to offer?

		<br><br>
		
		Many CEOs of companies newly working from home have been tempted by these benefits and are now even considering permanently flexible work arrangements. As the feared drop in productivity associated with working from home has not materialized and workers are reluctant to return to daily commutes, company leaders are now considering the weight of these competitive advantages.

		<br><br>
		[ blank 2 ]
		<br><br>
		
		Unfortunately, some companies have had to make an abrupt shift to working from home and thus lacked some combination of the time, resources, and expertise to make the most out of the situation. Others are finding that while working from home presented no difficulties in the short term, working from home in the long term comes with new — perhaps insurmountable — challenges.

		<br><br>
		
		One of the largest hurdles companies are facing related to working from home is training new hires. While remote training capabilities have been catching up with the sudden surge in demand and importance, many leaders still say that there are a lot of gaps to fill if remote training is going to replace traditional in-peron training. Some even fear that there is no substitute for new employees sitting beside their more experienced counterparts watching how tasks are carried out and asking questions about the process. Even something as seemingly minor as company jargon, companies now realize, is not being passed onto new employees as quickly as it is in person, thus negatively affecting productivity.

		<br><br>
		
		“It’s true that we did not see the huge drop-off in productivity that we feared immediately after the switch,” one company leader said in a recent interview. “However, I don’t think it’s sustainable in normal circumstances. At the time, they were sent home with a laptop and no promises in the middle of a global economic crisis. Nobody wanted to be seen as ineffective in those days.”

		<br><br>
		[ blank 3 ]
		<br><br>
		
		Perhaps the strongest argument in favor of in-person work environments are those things that you can’t schedule a video conference for. The serendipitous hallway networking meetings, the lunch conversations that reveal new perspectives on a project, and, of course, the sense that everyone is working together under one roof.

		<br><br>
		
		But, undeterred by tradition and convinced that working from home is more than just a trend, many offices are attempting to recreate those one-off interactions online. Some remote companies have employees video chat while on walks outside of their homes, while others set aside an hour every week for employees to chat with a co-worker they’ve been randomly paired with. Employee blogs, group chats, and video happy hours have also been popular strategies to build company culture while working remotely.

		<br><br>
		
		The efficacy of these efforts has lead to many CEOs searching for a compromise between in-person and remote working to define the future of their offices. Companies will be happy to lower their operating costs by reducing the number of employees they have to provide workspace for on any given day, and employees will be grateful for the flexibility of not having to come into the office every day.`,
		questions: [
			{ 
				id: '001', 
				question: 'What is the best title for this article?',
				choices: ['The COVID-19 pandemic’s effect on the workplace', 'Working from home: perks, problems, and possible solutions', 'Working from home may not be “working” after all', 'Making compromises in the year of the distributed workforce'],
				active: true 
			},
			{ 
				id: '002', 
				question: 'Choose the proper headings order in the appropriate [ blank 1 ], [ blank 2 ], [ blank 3 ] as they appear in the passage:',
				choices: ['1) A double edged sword - 2) Meeting in the middle - 3) Caught flat footed', '1) Driving a hard bargain - 2) A win-win situation - 3) Pros and cons of working from home', '1) A double edged sword - 2) Meeting in the middle - 3) A win-win situation', '1) A double edged sword - 2) Driving a hard bargain - 3) A win-win situation', '1) Meeting in the middle - 2) Caught flat footed - 3) Pros and cons of working from home'],
			},
			{ 
				id: '003', 
				question: 'What can you infer about training new hires remotely?',
				choices: ['Companies still haven’t figured out how to make remote training as effective as in-person training', 'The technology for in-person training is superior to the technology for remote training', 'It is impossible to train new hires remotely', 'An online encyclopedia of company jargon would solve many problems related to training new hires remotely'],
			},
			{ 
				id: '004', 
				question: 'In context the word dramatic (paragraph 2) most nearly means',
				choices: ['Theatrical', 'Fascinating', 'Pronounced', 'Emotional'],
			},
			{ 
				id: '005', 
				question: 'The purpose of this passage is most likely to',
				choices: ['Persuade readers of the benefits of a work from home policy', 'Inform readers of the loss of productivity that accompanies working from home', 'Explain to readers an overview of working, including pros, cons, and strategies to cope with changes', 'Hypothesize that working from home will continue to expand due to competition for talent'],
			},
			{ 
				id: '006', 
				question: 'The company leader quoted in paragraph 8 most likely feels',
				choices: ['That working from home is a good long-term solution for many business needs', 'That a global crisis has permanently changed how people work', 'That companies will need to lay off ineffective employees to cope with the economic crisis', 'That work arrangements will have to return to normal eventually'],
			},
			{ 
				id: '007', 
				question: 'Why did the author include the following sentence in paragraph 3?<i>Indeed, one 2017 study found that, on average, the ability to work from home was worth an 8% decrease in salary.</i>',
				choices: ['To convince employers to offer remote employees lower salaries', 'To support the claim that employees value working from home', 'To argue against remote work from an employee’s perspective', 'To suggest that working from home is at least partially responsible for stagnant wages'],
			},
			{ 
				id: '008', 
				question: 'Who is the most likely intended audience for this article?',
				choices: ['CEOs considering their own company’s work arrangements', 'Employees just starting to work from home', 'MBA candidates compiling a case study on the effects of working from home', 'Investors thinking about purchasing stock in remote employee training software'],
			},
			{ 
				id: '009', 
				question: 'In order to make working from home more effective, companies have tried all of the following EXCEPT',
				choices: ['Group chats', 'Attempt to recreate random interactions online', 'Always-on video conferencing', 'Video happy hours'],
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-listening-main',
  templateUrl: './listening-main.component.html',
  styleUrls: ['./listening-main.component.scss']
})
export class ListeningMainComponent implements OnInit {

	msaapDisplayTitle = false;
	msaapDisplayPlayList = true;
	msaapPageSizeOptions = [2,4,6];
	msaapDisplayVolumeControls = false;
	msaapDisplayArtist = false;
	msaapDisplayDuration = true;
	msaapDisablePositionSlider = false;

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


	// Material Style Advance Audio Player Playlist
	msaapPlaylist: Track[] = [
		{
		  title: 'Test 001',
		  link:
			'https://dl.dropboxusercontent.com/s/9v0psowra7ekhxo/A%20Himitsu%20-%20In%20Love%20%28feat.%20Nori%29.flac?dl=0',
		  duration: 227,
		  artist: 'A Himitsu feat. Nori'
		}
	];

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
			this.router.navigate(['/listening-test/result'])
		}
	}

	onSubmit(testForm) {
		console.log(testForm.value);
		this.router.navigate(['/listening-test/result'])
	}

}

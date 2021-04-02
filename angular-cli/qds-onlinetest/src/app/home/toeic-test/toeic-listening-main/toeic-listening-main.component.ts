import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CountdownEvent } from 'ngx-countdown';
import { ListeningQuestions } from './example-questions';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-toeic-listening-main',
  templateUrl: './toeic-listening-main.component.html',
  styleUrls: ['./toeic-listening-main.component.scss']
})
export class ToeicListeningMainComponent implements OnInit {
	@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	testTime:number
	logo:string=''
	config = {}
	submitDisable = true;
	listeningQuestions:any = ListeningQuestions;
	options:any
	currentTabIndex:number = 0;

	constructor(private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.listeningQuestions[1].active = true
		this.config = {
			leftTime: 1800,
			format: 'mm : ss'
		}
		this.options = {
			enabled: true,
			controls: ['play', 'progress', 'current-time', 'mute'],
			autoplay: true
		};
		//Audio array
		this.listeningQuestions.map(item => {
			item['audio'] = []
			let audio = {
				src: item.audioLink,
				type: 'audio/mp3'
			}
			item['audio'].push(audio);
		})
		console.log(this.player)
		console.log(this.listeningQuestions)
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			// this.onSubmit();
		}
	}

	showNextQuestion(key) {
		let that = this;
		let tabId = key + 1;
		let questionCount = this.listeningQuestions.length;
		// that.questions[key].customClass = 'done'
		if(tabId < questionCount) {
			that.staticTabs.tabs[tabId].active = true;
		}
	}

	changeTab(e) {
		this.currentTabIndex = e.heading - 1;
	}

	played(event: Plyr.PlyrEvent) {
		// console.log('played', event);
	}
	ready(event: Plyr.PlyrEvent) {
		// console.log('ready', event);
	}

	submitAnswer(question, alphabet) {
		
	}

	onSubmit() {
		// let that =  this;
		// console.log(that.submitForm)
		// axios({
		// 	method: 'post',
		// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// 	url: environment.hostApi + '/candidates/processtests.php',
		// 	data: JSON.stringify(this.submitForm)
		// })
		// .then(function (response) {
		// 	console.log(that.submitForm);
		// 	that.formIsSubmit = true;
		// 	that.router.navigate(['/technical-test/result'])
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// 	alert("Something wrong when submitting test!")
		// });
	}

}

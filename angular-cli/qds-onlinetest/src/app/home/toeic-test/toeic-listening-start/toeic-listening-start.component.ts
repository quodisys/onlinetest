import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-toeic-listening-start',
  templateUrl: './toeic-listening-start.component.html',
  styleUrls: ['./toeic-listening-start.component.scss']
})
export class ToeicListeningStartComponent implements OnInit {
	@ViewChild(PlyrComponent) plyr: PlyrComponent;
	player: Plyr;
	logo:string = ''
	topic:string = ''
	subtopic:string = ''
	options:any
	audio:any
	constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }
	
	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.audio = [
			{
				src: 'https://onlinetest.elsaspeak.com/questions/Listening-Test-Directions.mp3',
				type: 'audio/mp3'
			}
		]
		this.options = {
			enabled: true,
			controls: ['play', 'progress', 'current-time'],
			autoplay: true
		};
		this.getTestInfo();
		this.checkLanguage()
	}

	checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
		} else {
			this.translate.use("EN");
		}
	}

	getTestInfo() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId')
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/allocatedtests.php',
			data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data;
			var test = Object.keys(res).map((k) => res[k]);
			var mainTest = test.find( x => x.topic == "TOEIC")
			mainTest = mainTest.toeictests
			mainTest = Object.keys(mainTest).map((k) => mainTest[k]);
			mainTest = mainTest.find( x => x.topic == "TOEIC Listening")
			if(mainTest.status == 'Done') {
				that.router.navigate(['toeic-test']);
			}
			that.topic = mainTest.topic
			that.subtopic = mainTest.subtopic
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	initiateTest() {
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: this.topic,
			subtopic: this.subtopic
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/initiatetests.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data;
			console.log(res);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	signOut = function() {
		let that =  this;
		let data = {
			token: localStorage.getItem('token'),
			sess: localStorage.getItem('sessionId'),
			email: localStorage.getItem('email'),
			keyword: localStorage.getItem('keyword')
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/logout.php',
			data: JSON.stringify(data)
		})
		.then(function (response) {
			
			that.router.navigate(['/login'])
			console.log(response);
		})
		.catch(function (error) {
		});
	}

}

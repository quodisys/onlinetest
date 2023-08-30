import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-speaking-result',
  templateUrl: './speaking-result.component.html',
  styleUrls: ['./speaking-result.component.scss']
})
export class SpeakingResultComponent implements OnInit {
  logo:string = ''
	isPresidentUniver: boolean = false;
  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
	if(this.logo == undefined || this.logo == '') {
		this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
	}
	const keyword = localStorage.getItem('keyword')
	if(keyword === 'presidentunive') {
		this.isPresidentUniver = true
	}
    this.checkLanguage();
  }

  checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
		} else {
			this.translate.use("EN");
		}
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

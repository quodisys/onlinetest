import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grammar-vocabulary-result',
  templateUrl: './grammar-vocabulary-result.component.html',
  styleUrls: ['./grammar-vocabulary-result.component.scss']
})
export class GrammarVocabularyResultComponent implements OnInit {
  logo:string = ''
  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
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

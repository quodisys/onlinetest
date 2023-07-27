import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from './../../../../environments/environment';
@Component({
	selector: 'app-vocabulary-result',
	templateUrl: './vocabulary-result.component.html',
	styleUrls: ['./vocabulary-result.component.scss']
})
export class VocabularyResultComponent implements OnInit {
	logo:string = ''
	constructor(private router: Router) { 
		
	}

	ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
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

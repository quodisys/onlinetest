import { Component, OnInit } from '@angular/core';

import axios from 'axios';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-vocabulary-start',
  templateUrl: './vocabulary-start.component.html',
  styleUrls: ['./vocabulary-start.component.scss']
})
export class VocabularyStartComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	initiateTest() {
		let data = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId'),
			topic: "Vocabulary"
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

}

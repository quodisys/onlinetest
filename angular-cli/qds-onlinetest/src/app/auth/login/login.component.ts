import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from "./../../home/globalsVar";
import axios from 'axios';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	token: string;
	loginForm: FormGroup;
	isSubmitted = false;
	logo: string = "";
	keyword: string;
	cl: string;
	ca: string;
	error: string;
	languages;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public globals: Globals, private translate: TranslateService) { 
		
	}

	ngOnInit() {
		localStorage.clear()
		this.token = this.activatedRoute.snapshot.queryParams['token']
		this.ca = this.activatedRoute.snapshot.queryParams['ca']
		this.cl = this.activatedRoute.snapshot.queryParams['cl']
		localStorage.setItem('token', this.token);
		localStorage.setItem('ca', this.ca);
		localStorage.setItem('cl', this.cl);
		this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]],
			lang: ['EN', [Validators.required]]
		})
		// this.checkAndSignout()
		this.checkLanguage()
		this.getInfo()
		this.getLang()
	}

	get f() { return this.loginForm.controls; }

	// checkAndSignout() {
	// 	let that = this
	// 	let data = {
	// 		token: localStorage.getItem('token'),
	// 		email: localStorage.getItem('email'),
	// 		keyword: localStorage.getItem('keyword')
	// 	}
	// 	console.log(data);
	// 	if(data.token != null && data.email != null && data.keyword != null) {
	// 		console.log('signout');
	// 		axios({
	// 			method: 'post',
	// 			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	// 			url: environment.hostApi + '/candidates/logout.php',
	// 			data: JSON.stringify(data)
	// 		})
	// 		.then(function (response) {
	// 			localStorage.clear()
	// 			console.log(response);
	// 		})
	// 		.catch(function (error) {
	// 		});
	// 	}
		
	// }

	getInfo() {
		let that = this;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/login.php',
			  data: JSON.stringify({"cl": that.cl})
		})
		.then(function (response) {
			that.logo = response.data[0].logo;
			that.keyword = response.data[0].keyword;
			localStorage.setItem('logoUrl', response.data[0].logo);
			localStorage.setItem('keyword', response.data[0].keyword);
			if(that.logo == undefined) {
				that.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	getLang() {
		let that = this
		axios({
			method: 'get',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/getavailablelang.php'
		})
		.then(function (response) {
			that.languages = response.data
			that.languages.map(item => {
				item['icon'] = environment.hostApi + item.icon
			})
			console.log(that.languages);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	checkLanguage() {
		let languageStore = localStorage.getItem('language');
		if(languageStore) {
			this.translate.use(languageStore);
			this.loginForm.patchValue({
				lang: languageStore
			})
		} else {
			this.translate.use("EN");
		}
	}

	useLanguage(language) {
		this.translate.use(language);
		localStorage.setItem('language', language)
	}


	onSubmit() {
		let that = this;
		let data = {
			token: that.token,
			cl: that.cl,
			keyword: that.keyword,
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		}
		this.isSubmitted = true;
		if(this.loginForm.invalid){
			return;
		}
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/checkuser.php',
			  data: JSON.stringify(data)
		})
		.then(function (response) {
			var res = response.data[0];
			if(res.msg == 'Success') {
				localStorage.setItem('adminAuth', 'true');
				localStorage.setItem('sessionId', res.sess);
				localStorage.setItem('email', that.loginForm.value.email);
				localStorage.setItem('fullname', res.fullname);
				localStorage.setItem('language', that.loginForm.value.lang);
				if(res.profile == '') {
					that.router.navigate(['/profile']);
				} else {
					that.router.navigate(['/home']);
				}
			} else {
				that.error = res.error;
				console.log(res.error)
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from "./../../home/globalsVar";
import axios from 'axios';

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

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public globals: Globals) { 
		localStorage.clear();
	}

	ngOnInit() {
		this.token = this.activatedRoute.snapshot.queryParams['token']
		this.ca = this.activatedRoute.snapshot.queryParams['ca']
		this.cl = this.activatedRoute.snapshot.queryParams['cl']
		localStorage.setItem('token', this.token);
		localStorage.setItem('ca', this.ca);
		localStorage.setItem('cl', this.cl);
		this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]]
		})
		this.getInfo()
	}

	get f() { return this.loginForm.controls; }

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
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
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
		console.log(data)
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
				localStorage.setItem('SessionId', res.sess);
				that.router.navigate(['/home']);
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

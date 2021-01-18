import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from "./../../home/globalsVar";
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	token: string
	loginForm: FormGroup;
	isSubmitted = false;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public globals: Globals) { 
		var token = this.activatedRoute.snapshot.queryParams['token']
		var ca = this.activatedRoute.snapshot.queryParams['ca']
		var cl = this.activatedRoute.snapshot.queryParams['cl']
		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('ca', JSON.stringify(ca));
		localStorage.setItem('cl', JSON.stringify(cl));
		console.log(this.globals)
	}

	ngOnInit() {
		localStorage.removeItem('adminAuth');
		this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]]
		})
		this.getInfo()
	}

	get f() { return this.loginForm.controls; }

	getInfo() {
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: 'https://onlinetest.quodisys.com/candidates/login.php',
			  data: JSON.stringify({"cl": "4"})
			  //data: {"cl": "4"}
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}


	onSubmit() {
		this.isSubmitted = true;
		if(this.loginForm.invalid){
			return;
		}
		localStorage.setItem('adminAuth', JSON.stringify({login: true}));
		this.router.navigate(['/home']);
	}

}

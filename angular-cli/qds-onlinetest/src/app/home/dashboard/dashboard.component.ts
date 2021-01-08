import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	loginForm: FormGroup;
	isSubmitted = false;

	constructor(private router: Router, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
	}

	get f() { return this.loginForm.controls; }


	onSubmit() {
		console.log(this.loginForm.value);
		this.isSubmitted = true;
		if(this.loginForm.invalid){
			return;
		}
		this.router.navigate(['/home']);
	}

}

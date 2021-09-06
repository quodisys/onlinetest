import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { environment } from './../../../environments/environment';
import axios from 'axios';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	logo:string = ''
	email:string = '';
	fullname:string = '';
    profileForm: FormGroup;
	skillsList:any = []
	submitForm:any

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private translate: TranslateService) { 
		let languageLocal = localStorage.getItem('language')
		console.log(languageLocal);
		if(languageLocal != undefined) {
			translate.setDefaultLang(languageLocal);
		} else {
			translate.setDefaultLang("EN");
		}
	}

    ngOnInit(): void {
		this.logo = localStorage.getItem('logoUrl');
		if(this.logo == undefined || this.logo == '') {
			this.logo = "https://qdsasia.com/wp-content/themes/qdstheme/assets/img/qds-logo-scaled.png"
		}
		this.email = localStorage.getItem('email'),
		this.fullname = localStorage.getItem('fullname'),
		this.submitForm = {
			token: localStorage.getItem('token'),
			keyword: localStorage.getItem('keyword'),
			sess: localStorage.getItem('sessionId')
		}
		this.profileForm = this.formBuilder.group({
			fullname: [{value: this.fullname, disabled: true}, [Validators.required]],
            email: [{value: this.email, disabled: true}, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")]],
            dob: ['', [Validators.required]],
			position: ['', [Validators.required]],
			level: ['Beginner', [Validators.required]],
			experience: ['0', [Validators.required]],
			jobPostLink: [''],
			linkin: [''],
			skills: [''],
		})
    }

	onSubmit() {
		let that = this;
		this.submitForm['dob'] = formatDate(this.profileForm.value.dob, 'MM/dd/yyyy', 'en-US');
		this.submitForm['position'] = this.profileForm.value.position;
		this.submitForm['level'] = this.profileForm.value.level;
		this.submitForm['experience'] = this.profileForm.value.experience;
		this.submitForm['jobpostlink'] = this.profileForm.value.jobPostLink;
		this.submitForm['linkedin'] = this.profileForm.value.linkin;
		this.submitForm['skills'] = this.profileForm.value.skills;
		axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: environment.hostApi + '/candidates/profile.php',
			data: JSON.stringify(this.submitForm)
		})
		.then(function (response) {
			that.router.navigate(['/home']);
		})
		.catch(function (error) {
			console.log(error);
		});
		console.log(this.submitForm);
	}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from "./../../home/globalsVar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor(private router: Router, private formBuilder: FormBuilder, public globals: Globals) { 
		console.log(localStorage.getItem('token'))
	}

	ngOnInit() {
		
	}
}

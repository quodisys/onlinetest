import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iq-main',
  templateUrl: './iq-main.component.html',
  styleUrls: ['./iq-main.component.scss']
})
export class IqMainComponent implements OnInit {

	config = {}

	constructor(private elementRef: ElementRef, private router: Router) { }

	ngOnInit(): void {
		this.config = {
			leftTime: 10,
			format: 'mm:ss'
		}
	}
	counterEvent(e: CountdownEvent) {
		if(e.action == 'done') {
			this.router.navigate(['/iq-test/result'])
		}
	}
}

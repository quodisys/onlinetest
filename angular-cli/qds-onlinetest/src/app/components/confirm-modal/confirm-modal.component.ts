import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

	@ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
	isModalShown = false;

	constructor() { }

	ngOnInit(): void {
	}

	showModal() {
		this.isModalShown = true;
	}		
	onHidden() {
		this.isModalShown = false;
	}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeakingTestMicroModalComponent } from '../speaking-test-micro-modal/speaking-test-micro-modal.component';

@Component({
  selector: 'app-speaking-start',
  templateUrl: './speaking-start.component.html',
  styleUrls: ['./speaking-start.component.scss']
})
export class SpeakingStartComponent implements OnInit {

  @ViewChild(SpeakingTestMicroModalComponent, {static: false}) private SpeakingTestMicroModalComponent: SpeakingTestMicroModalComponent;

  constructor() { }

  ngOnInit(): void {

  }
  openModal() {
		this.SpeakingTestMicroModalComponent.showModal();
	}

}

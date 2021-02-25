import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal'; 

declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-speaking-test-micro-modal',
  templateUrl: './speaking-test-micro-modal.component.html',
  styleUrls: ['./speaking-test-micro-modal.component.scss']
})
export class SpeakingTestMicroModalComponent implements OnInit {

  	@ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;

	@ViewChild('stream') audioPlayerRef: ElementRef<HTMLAudioElement>;

	get $player(): HTMLAudioElement {
		return this.audioPlayerRef.nativeElement;
	}

	recording: Boolean = false;

	//Lets declare Record OBJ
	record;
	//URL of Blob
	url;
	error;

	isModalShown = false;

	constructor(private domSanitizer: DomSanitizer) { }

	ngOnInit(): void {
	}

	showModal() {
		this.isModalShown = true;
	}		
	onHidden() {
		this.isModalShown = false;
	}

	sanitize(url: string) {
		return this.domSanitizer.bypassSecurityTrustUrl(url);
	}
	/**
	 * Start recording.
	 */
	initiateRecording() {
		this.recording = true;
		let mediaConstraints = {
			video: false,
			audio: true
		};
		navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
	}
	/**
	 * Will be called automatically.
	 */
	successCallback(stream) {
		var options = {
			mimeType: "audio/wav",
			numberOfAudioChannels: 1,
			sampleRate: 44100,
		};
		//Start Actuall Recording
		var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
		this.record = new StereoAudioRecorder(stream, options);
		this.record.record();
	}
	/**
	 * Stop recording.
	 */
	stopTestRecording() {
		this.recording = false;
		this.record.stop(this.processRecording.bind(this));
	}
	/**
	 * processRecording Do what ever you want with blob
	 * @param  {any} blob Blog
	 */
	
	processRecording(blob) {
		this.url = URL.createObjectURL(blob);
		this.$player.load();
		this.$player.play();
	}
	/**
	 * Process Error.
	 */
	errorCallback(error) {
		this.error = 'Can not play audio in your browser';
	}

	

	

}

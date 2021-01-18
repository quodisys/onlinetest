import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeakingStartComponent } from './speaking-start/speaking-start.component'
import { SpeakingMainComponent } from './speaking-main/speaking-main.component'
import { SpeakingResultComponent } from './speaking-result/speaking-result.component'

const routes: Routes = [
	{ 	
		path: '',
		component: SpeakingStartComponent
	},{ 	
		path: 'start-test',
		component: SpeakingMainComponent
	},{ 	
		path: 'result',
		component: SpeakingResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpeakingTestRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToeicStartComponent } from './toeic-start/toeic-start.component'
import { ToeicListeningStartComponent } from './toeic-listening-start/toeic-listening-start.component'
import { ToeicListeningMainComponent } from './toeic-listening-main/toeic-listening-main.component'
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: ToeicStartComponent
	}, { 	
		path: 'listening-start',
		component: ToeicListeningStartComponent
	}, { 	
		path: 'listening-test',
		component: ToeicListeningMainComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ToeicTestRoutingModule { }

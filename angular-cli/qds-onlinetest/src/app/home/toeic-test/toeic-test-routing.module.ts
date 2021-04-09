import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToeicStartComponent } from './toeic-start/toeic-start.component'
import { ToeicListeningStartComponent } from './toeic-listening-start/toeic-listening-start.component'
import { ToeicListeningMainComponent } from './toeic-listening-main/toeic-listening-main.component'
import { ToeicReadingStartComponent } from './toeic-reading-start/toeic-reading-start.component'
import { ToeicReadingMainComponent } from './toeic-reading-main/toeic-reading-main.component'
import { ToeicResultComponent } from './toeic-result/toeic-result.component'
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
	}, { 	
		path: 'reading-start',
		component: ToeicReadingStartComponent
	}, { 	
		path: 'reading-test',
		component: ToeicReadingMainComponent
	}, { 	
		path: 'result',
		component: ToeicResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ToeicTestRoutingModule { }

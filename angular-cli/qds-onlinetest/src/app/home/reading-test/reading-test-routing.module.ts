import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingStartComponent } from './reading-start/reading-start.component'
import { ReadingMainComponent } from './reading-main/reading-main.component'
import { ReadingResultComponent } from './reading-result/reading-result.component'
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: ReadingStartComponent
	},{ 	
		path: 'start-test',
		component: ReadingMainComponent,
		canDeactivate: [CanDeactivateGuard]
	},{ 	
		path: 'result',
		component: ReadingResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReadingTestRoutingModule { }

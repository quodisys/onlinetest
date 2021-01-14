import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingStartComponent } from './reading-start/reading-start.component'
import { ReadingMainComponent } from './reading-main/reading-main.component'
import { ReadingResultComponent } from './reading-result/reading-result.component'

const routes: Routes = [
	{ 	
		path: '',
		component: ReadingStartComponent
	},{ 	
		path: 'start-test',
		component: ReadingMainComponent
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

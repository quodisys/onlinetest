import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AptitudeStartComponent } from './aptitude-start/aptitude-start.component'
import { AptitudeMainComponent } from './aptitude-main/aptitude-main.component'
import { AptitudeResultComponent } from './aptitude-result/aptitude-result.component'

const routes: Routes = [
	{ 	
		path: '',
		component: AptitudeStartComponent
	},{ 	
		path: 'start-test',
		component: AptitudeMainComponent
	},{ 	
		path: 'result',
		component: AptitudeResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AptitudeTestRoutingModule { }

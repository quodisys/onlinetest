import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AptitudeStartComponent } from './aptitude-start/aptitude-start.component'
import { AptitudeMainComponent } from './aptitude-main/aptitude-main.component'
import { AptitudeResultComponent } from './aptitude-result/aptitude-result.component'
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: AptitudeStartComponent
	},{ 	
		path: 'start-test',
		component: AptitudeMainComponent,
		canDeactivate: [CanDeactivateGuard]
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

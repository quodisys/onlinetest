import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeningResultComponent } from './listening-result/listening-result.component';
import { ListeningStartComponent } from './listening-start/listening-start.component';
import { ListeningMainComponent } from './listening-main/listening-main.component';
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: ListeningStartComponent
	},{ 	
		path: 'start-test',
		component: ListeningMainComponent,
		canDeactivate: [CanDeactivateGuard]
	},{ 	
		path: 'result',
		component: ListeningResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ListeningTestRoutingModule { }

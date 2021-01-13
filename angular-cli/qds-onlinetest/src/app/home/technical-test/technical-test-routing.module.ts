import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicalStartComponent } from './technical-start/technical-start.component'
import { TechnicalMainComponent } from './technical-main/technical-main.component'
import { TechnicalResultComponent } from './technical-result/technical-result.component'

const routes: Routes = [
	{ 	
		path: '',
		component: TechnicalStartComponent
	},{ 	
		path: 'start-test',
		component: TechnicalMainComponent
	},{ 	
		path: 'result',
		component: TechnicalResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TechnicalTestRoutingModule { }

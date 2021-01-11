import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IqStartComponent } from './iq-start/iq-start.component'
import { IqMainComponent } from './iq-main/iq-main.component'
import { IqResultComponent } from './iq-result/iq-result.component'

const routes: Routes = [
	{ 	
		path: '',
		component: IqStartComponent
	},{ 	
		path: 'start-test',
		component: IqMainComponent
	},{ 	
		path: 'result',
		component: IqResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IqTestRoutingModule { }

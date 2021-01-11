import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocManagerComponent } from './doc-manager-list/doc-manager.component';
import { CraFormComponent } from './cra-form/cra-form.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
	{ 	
		path: '',
		component: DocManagerComponent
	},{ 	
		path: ':uuid',
		component: CraFormComponent
	},{ 	
		path: 'workflow/:uuid',
		component: WorkflowComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DocManagerRoutingModule { }

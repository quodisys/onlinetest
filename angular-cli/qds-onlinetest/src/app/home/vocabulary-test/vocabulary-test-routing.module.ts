import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyStartComponent } from './vocabulary-start/vocabulary-start.component';
import { VocabularyMainComponent } from './vocabulary-main/vocabulary-main.component';
import { VocabularyResultComponent } from './vocabulary-result/vocabulary-result.component';
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: VocabularyStartComponent
	},{ 	
		path: 'start-test',
		component: VocabularyMainComponent,
		canDeactivate: [CanDeactivateGuard]
	},{ 	
		path: 'result',
		component: VocabularyResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VocabularyTestRoutingModule { }

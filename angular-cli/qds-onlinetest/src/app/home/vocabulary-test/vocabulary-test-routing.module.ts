import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyStartComponent } from './vocabulary-start/vocabulary-start.component';
import { VocabularyMainComponent } from './vocabulary-main/vocabulary-main.component';
import { VocabularyResultComponent } from './vocabulary-result/vocabulary-result.component';

const routes: Routes = [
	{ 	
		path: '',
		component: VocabularyStartComponent
	},{ 	
		path: 'start-test',
		component: VocabularyMainComponent
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

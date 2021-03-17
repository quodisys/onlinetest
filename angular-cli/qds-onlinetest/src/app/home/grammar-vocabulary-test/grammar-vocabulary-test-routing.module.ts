import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrammarVocabularyStartComponent } from './grammar-vocabulary-start/grammar-vocabulary-start.component';
import { GrammarVocabularyMainComponent } from './grammar-vocabulary-main/grammar-vocabulary-main.component';
import { GrammarVocabularyResultComponent } from './grammar-vocabulary-result/grammar-vocabulary-result.component';
import { CanDeactivateGuard } from '../../guards/can-deactive.guard'

const routes: Routes = [
	{ 	
		path: '',
		component: GrammarVocabularyStartComponent
	},{ 	
		path: 'start-test',
		component: GrammarVocabularyMainComponent,
		canDeactivate: [CanDeactivateGuard]
	},{ 	
		path: 'result',
		component: GrammarVocabularyResultComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GrammarVocabularyTestRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrammarVocabularyStartComponent } from './grammar-vocabulary-start/grammar-vocabulary-start.component';
import { GrammarVocabularyMainComponent } from './grammar-vocabulary-main/grammar-vocabulary-main.component';
import { GrammarVocabularyResultComponent } from './grammar-vocabulary-result/grammar-vocabulary-result.component';

const routes: Routes = [
	{ 	
		path: '',
		component: GrammarVocabularyStartComponent
	},{ 	
		path: 'start-test',
		component: GrammarVocabularyMainComponent
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

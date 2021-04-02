import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component'
import { EnglishTestComponent } from './home/english-test/english-test.component'
import { AuthGuard } from './guards/auth.guard'


const routes: Routes = [
	{
		path: 'login',
		component: AuthComponent,
		children: [
			{
				path: '',
				component: LoginComponent
			}
		]
	},
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				loadChildren: () => import('./home/dashboard/dashboard.module').then(m => m.DashboardModule)
			},{
				path: 'profile',
				loadChildren: () => import('./home/profile/profile.module').then(m => m.ProfileModule)
			},{
				path: 'home',
				loadChildren: () => import('./home/dashboard/dashboard.module').then(m => m.DashboardModule)
			},{
				path: 'iq-test',
				loadChildren: () => import('./home/iq-test/iq-test.module').then(m => m.IqTestModule)
			},{
				path: 'technical-test',
				loadChildren: () => import('./home/technical-test/technical-test.module').then(m => m.TechnicalTestModule)
			},{
				path: 'aptitude-test',
				loadChildren: () => import('./home/aptitude-test/aptitude-test.module').then(m => m.AptitudeTestModule)
			},{
				path: 'reading-test',
				loadChildren: () => import('./home/reading-test/reading-test.module').then(m => m.ReadingTestModule)
			},{
				path: 'vocabulary-test',
				loadChildren: () => import('./home/vocabulary-test/vocabulary-test.module').then(m => m.VocabularyTestModule)
			},{
				path: 'grammar-vocabulary-test',
				loadChildren: () => import('./home/grammar-vocabulary-test/grammar-vocabulary-test.module').then(m => m.GrammarVocabularyTestModule)
			},{
				path: 'speaking-test',
				loadChildren: () => import('./home/speaking-test/speaking-test.module').then(m => m.SpeakingTestModule)
			},{
				path: 'listening-test',
				loadChildren: () => import('./home/listening-test/listening-test.module').then(m => m.ListeningTestModule)
			},{
				path: 'toeic-test',
				loadChildren: () => import('./home/toeic-test/toeic-test.module').then(m => m.ToeicTestModule)
			},
			{
				path: 'english-test',
				component: EnglishTestComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

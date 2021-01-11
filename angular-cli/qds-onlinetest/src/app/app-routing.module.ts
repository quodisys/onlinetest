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
				path: 'home',
				loadChildren: () => import('./home/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'english-test',
				component: EnglishTestComponent
			}
		]
	}
	
	
	
	// ,
	// {
	// 	path: 'home',
	// 	component: DashboardComponent,
	// 	canActivate: [AuthGuard]
	// },
	// {
	// 	path: 'english-test',
	// 	component: EnglishTestComponent,
	// 	canActivate: [AuthGuard]
	// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

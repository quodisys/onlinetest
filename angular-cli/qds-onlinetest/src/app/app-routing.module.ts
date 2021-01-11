import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { DashboardComponent } from './home/dashboard/dashboard.component'
import { AuthGuard } from './guards/auth.guard'


const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'home',
		component: DashboardComponent,
		canActivate: [AuthGuard]

	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

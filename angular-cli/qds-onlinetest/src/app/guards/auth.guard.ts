import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(public router: Router){
		
	} 
	async canActivate():Promise<boolean> {
		var loggedin = !!localStorage.getItem('adminAuth')
		if(loggedin) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}

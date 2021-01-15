import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(public router: Router, private activatedRoute: ActivatedRoute){
		
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

import { Injectable } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthActivatorService implements CanActivate{
    private isLoggedIn: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        this.authService.getIsLoggedIn().subscribe(value => console.log('is logged in is: ' + value));
        this.authService.getIsLoggedIn().subscribe(value => this.isLoggedIn = value);
      // console.log('In auth-activator is isLoggedIn: ' + this.isLoggedIn);
        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
        }
        return this.isLoggedIn;
    }
}

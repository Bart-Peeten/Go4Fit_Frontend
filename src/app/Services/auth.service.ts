import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    loggedIn = false;

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}

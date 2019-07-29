import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthService {
    isLoggedIn: BehaviorSubject<boolean>;
    isLoggedInAsAdmin: BehaviorSubject<boolean>;
    private _name: String;

    constructor() {
        this.isLoggedIn = new BehaviorSubject<boolean>(false);
        this.isLoggedInAsAdmin = new BehaviorSubject<boolean>(false);
    }

    set name(value: String) {
        this._name = value;
    }

    get name(): String {
        return this._name;
    }

    public getIsLoggedIn(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    public setIsLoggedIn(newValue: boolean): void {
        this.isLoggedIn.next(newValue);
    }

    public getIsLoggedInAsAdmin() {
        return this.isLoggedInAsAdmin.asObservable();
    }

    public setIsLoggedInAsAdmin(newValue: boolean) {
        this.isLoggedInAsAdmin.next(newValue);
    }

    public login(username: string, password: string) {
        this.name = username;
        if (username == 'test') {
            this.setIsLoggedIn(true);
        } else if (username == 'admin') {
            this.setIsLoggedInAsAdmin(true);
            this.setIsLoggedIn(true);
        }
    }
}

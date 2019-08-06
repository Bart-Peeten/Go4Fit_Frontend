import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../Domains/user.model';

@Injectable()
export class AuthService {
    isLoggedIn: BehaviorSubject<boolean>;
    isLoggedInAsAdmin: BehaviorSubject<boolean>;
    private password: string;
    private _name: string;

    constructor(private http: HttpClient) {
        this.isLoggedIn = new BehaviorSubject<boolean>(false);
        this.isLoggedInAsAdmin = new BehaviorSubject<boolean>(false);
    }

    set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name;
    }

    public getPassword(): string {
        return this.password;
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
        this.password = password;
        if (username == 'test') {
            this.setIsLoggedIn(true);
        } else if (username == 'admin') {
            this.setIsLoggedInAsAdmin(true);
            this.setIsLoggedIn(true);
        }

        sessionStorage.setItem('username', username);
    }

    public signIn(lastName: String, firstName: String, email: String, phone: String, password: String) {
        let newUser = new User(lastName, firstName, email, phone, password);
        console.log(newUser);
        this.setIsLoggedIn(true);
        return this.http.post('', newUser);
    }
}

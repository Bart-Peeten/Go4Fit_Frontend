import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../Domains/user.model';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    isLoggedIn: BehaviorSubject<boolean>;
    isLoggedInAsAdmin: BehaviorSubject<boolean>;
    private password: string;
    private _name: string;
    private _firstname: String;
    private _lastname: String;
    private _loggedInUser: User;
    private url = environment.url;
    private username: string;

    constructor(private http: HttpClient) {
        this.isLoggedIn = new BehaviorSubject<boolean>(false);
        this.isLoggedInAsAdmin = new BehaviorSubject<boolean>(false);
    }

    get loggedInUser(): User {
        return this._loggedInUser;
    }

    set loggedInUser(value: User) {
        this._loggedInUser = value;
    }

    get lastname(): String {
        return this._lastname;
    }

    set lastname(value: String) {
        this._lastname = value;
    }

    get firstname(): String {
        return this._firstname;
    }

    set firstname(value: String) {
        this._firstname = value;
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

    public getUserName(): String {
        return this.username;
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
        this.password = password;
        this.username = username;
        const params = new HttpParams()
            .set('useremail', username)
            .set('userPassword', password);

      // this.setIsLoggedIn(true);
      // this.setIsLoggedInAsAdmin(true);

        console.log('De params zijn: ' + params);

        return this.http.get<User>(this.url + 'users/login', {params: params}).pipe(
            map(result => {
                sessionStorage.setItem('username', username);
                this.firstname = result.firstName;
                this.lastname = result.lastName;
                this.setIsLoggedIn(true);
                console.log('DE ROL IS: ' + result.role);
                if (result.role === 'ROLE_ADMIN') {
                    this.setIsLoggedIn(true);
                    this.setIsLoggedInAsAdmin(true);
                }

                this.name = result.firstName + ' ' + result.lastName;
                this.loggedInUser = result;
                return result;
            })
        );
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem('username');
        return !(user === null);
    }

    logout() {
        sessionStorage.removeItem('username');
        this.setIsLoggedInAsAdmin(false);
        this.setIsLoggedIn(false);
    }

    public signIn(lastName: string, firstName: string, email: string, phone: string, password: string) {
        const newUser = new User(lastName, firstName, email, phone, password);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        console.log(newUser);
        return this.http.post<User>(this.url + 'users/registration', newUser, {headers: headers}).pipe(
            map(result => {
                sessionStorage.setItem('username', email);
                this.setIsLoggedIn(true);
                console.log('DE ROL IS: ' + result.role);
                if (result.role === 'ROLE_ADMIN') {
                    this.setIsLoggedIn(true);
                    this.setIsLoggedInAsAdmin(true);
                }
                this.name = result.firstName + ' ' + result.lastName;
                this.loggedInUser = result;
                return result;
            })
        );
    }

  public createUserAsAdmin(lastName: string, firstName: string, email: string, phone: string, password: string, role?: string) {
    const newUser = new User(lastName, firstName, email, phone, password, role);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log(newUser);
    return this.http.post<User>(this.url + 'users/registration', newUser, {headers: headers}).pipe(
      map(result => {
        sessionStorage.setItem('username', email);
        this.setIsLoggedIn(true);
        console.log('DE ROL IS: ' + result.role);
        if (result.role === 'ROLE_ADMIN') {
          this.setIsLoggedIn(true);
          this.setIsLoggedInAsAdmin(true);
        }
        this.name = result.firstName + ' ' + result.lastName;
        this.loggedInUser = result;
        return result;
      })
    );
  }
}

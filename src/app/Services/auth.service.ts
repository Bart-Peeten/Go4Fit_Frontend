import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../Domains/user.model';
import {catchError, map} from 'rxjs/operators';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable()
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;
  isLoggedInAsAdmin: BehaviorSubject<boolean>;
  private password: string;
  private _name: string;
  private _loggedInUser: User;
  private url = 'http://localhost:8080/api/';
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

    console.log('De params zijn: ' + params);

    return this.http.get<User>(this.url + 'users/login', {params: params}).pipe(
      map(result => {
        sessionStorage.setItem('username', username);
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
    this.setIsLoggedIn(true);
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

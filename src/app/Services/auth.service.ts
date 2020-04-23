import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../Domains/user.model';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;
  isLoggedInAsAdmin: BehaviorSubject<boolean>;
  private password: string;
  private _name: string;
  private _firstname: string;
  private _lastname: string;
  private _loggedInUser: User;
  private url = environment.url;
  private username: string;
  private fullName: string;
  private email: string;
  private token: string;

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

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  public setToken(value: string) {
    this.token = value;
  }

  public getToken() {
    return this.token;
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

  public getEmail(): string {
    return this.email;
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

    return this.http.post<User>(this.url + 'v1/login', {email: username, password: password}).pipe(
      map(result => {
        // console.log('Er is ingelogd!');
        console.log(result['user'].name);
        sessionStorage.setItem('username', username);
        this.setToken(result['token']);
        this.firstname = result['user'].firstname;
        this.lastname = result['user'].name;
        this.email = result['user'].email;
        this.setIsLoggedIn(true);
        // console.log('DE ROL IS: ' + result.role);
        if (result['user'].role === 'ROLE_ADMIN') {
          this.setIsLoggedIn(true);
          this.setIsLoggedInAsAdmin(true);
        }

        this.name = result.firstname + ' ' + result.name;
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

  public signIn(lastName: string, firstName: string, email: string, phone: string, password: string, password_confirmation: string) {
    const newUser = new User(lastName, firstName, email, phone, password, password_confirmation, 'ROLE_USER ');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log(this.url);
    // console.log(newUser);
    return this.http.post<User>(this.url + 'v1/register', newUser, {headers: headers}).pipe(
      map(result => {
        // console.log(result['token']);
        // this.setToken(result['token']);
        // console.log(this.getToken());
        // console.log('Het resultaat van het INLOGGEN is: ');
        // console.log(result['user'].role);
        sessionStorage.setItem('username', email);
        this.setIsLoggedIn(true);
        // console.log('DE ROL IS: ' + result.role);
        if (result['data'].role === 'ROLE_ADMIN') {
          this.setIsLoggedIn(true);
          this.setIsLoggedInAsAdmin(true);
        }
        this.name = result.firstname + ' ' + result.name;
        this.loggedInUser = result;
        return result;
      })
    );
  }

  public createUserAsAdmin(lastName: string, firstName: string, email: string, phone: string, password: string, role?: string) {
    const newUser = new User(lastName, firstName, email, phone, password, role);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(newUser);
    return this.http.post<User>(this.url + 'v1/register', newUser, {headers: headers}).pipe(
      map(result => {
        sessionStorage.setItem('username', email);
        this.setIsLoggedIn(true);
        // console.log('DE ROL IS: ' + result.role);
        if (result['user'].role === 'ROLE_ADMIN') {
          this.setIsLoggedIn(true);
          this.setIsLoggedInAsAdmin(true);
        }
        this.name = result.firstname + ' ' + result.name;
        this.loggedInUser = result;
        return result;
      })
    );
  }

  public getHeaders() {
    // const securityToken = this.getUserName() + ':' + this.getPassword();
    // // console.log('Security token is: ' + securityToken);
    // return new HttpHeaders().set('Authorization', 'Basic ' +
    //   btoa(securityToken));
    return new HttpHeaders({'Content-Type': 'application/json'});
  }
}

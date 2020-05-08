import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin: boolean;
  isLoggedinAsAdmin: boolean;
  show = false;

  constructor(private authService: AuthService,
              private router: Router,
              private document: Document) {
    authService.getIsLoggedIn().subscribe(value => this.setIsLoggedIn(value));
    authService.getIsLoggedInAsAdmin().subscribe(value => this.setIsLoggedInAsAdmin(value));
  }

  setIsLoggedIn(status: boolean) {
    this.isLoggedin = status;
  }

  setIsLoggedInAsAdmin(status: boolean) {
    this.isLoggedinAsAdmin = status;
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.setIsLoggedIn(false);
    this.authService.setIsLoggedInAsAdmin(false);
    // this.router.navigate(['/home']);
    this.document.location.href = 'http://go4fitwordpress.byethost8.com/';
  }
}

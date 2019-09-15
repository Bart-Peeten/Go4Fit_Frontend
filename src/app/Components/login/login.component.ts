import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    isLoggedin: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        // this.authService.getIsLoggedIn().subscribe(value => this.setIsLoggedIn(value));
        console.log('Er wordt naar de login pagina genavigeerd');
    }

    login() {
      this.authService.login(this.username, this.password).subscribe(
        result => {
          console.log('Het resultaat van login is: ' + result);
          this.router.navigate(['/agenda']);
          this.isLoggedin = true;
        }, error => {
          this.isLoggedin = false;
          // window.confirm(`Error Code: ${error.status}\nMessage: ${error.message}`);
        }
      );
    }


        /*if (this.authService.login(this.username, this.password)) {
          console.log('logging in...');
          this.isLoggedin = true;
          this.router.navigate(['/agenda']);
        } else {
          this.isLoggedin = false;
        }
    }*/

    /*setIsLoggedIn(status: boolean) {
        this.isLoggedin = status;
    }*/

}

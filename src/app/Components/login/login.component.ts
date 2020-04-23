import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorHandlerService} from '../../Services/error-handler.service';
import {LoaderService} from '../../Services/loader-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    isLoggedin: boolean;

    constructor(private authService: AuthService,
                private router: Router,
                private errorHandler: ErrorHandlerService,
                private loaderService: LoaderService) { }

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
          const errorMessage = this.errorHandler.getErrorMessage(error);
          window.confirm(errorMessage);
        }
      );
    }
}

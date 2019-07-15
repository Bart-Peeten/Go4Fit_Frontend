import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

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
        this.authService.getIsLoggedIn().subscribe(value => this.setIsLoggedIn(value));
        console.log('Er wordt naar de login pagina genavigeerd');
    }

    login() {
        this.authService.login(this.username, this.password);
        console.log('logging in');
        console.log(this.username);
        console.log(this.password);
        this.router.navigate(['/agenda'])
    }

    setIsLoggedIn(status: boolean) {
        this.isLoggedin = status;
    }

}

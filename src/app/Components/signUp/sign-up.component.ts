import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    password: string;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    signIn() {
        this.authService.signIn(this.lastName, this.firstName, this.email, this.phone, this.password)
            .subscribe(_ => this.router.navigate(['/agenda']));
        // this.router.navigate(['/agenda']);
    }
}

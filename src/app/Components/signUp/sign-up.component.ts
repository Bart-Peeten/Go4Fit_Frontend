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
    password_confirmation: string;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    signIn() {
      if (this.password === this.password_confirmation) {
        this.authService.signIn(this.lastName, this.firstName, this.email, this.phone, this.password, this.password_confirmation)
          .subscribe(_ => this.router.navigate(['/login']));
      } else {
        window.confirm('Beide paswoorden zijn niet gelijk aan elkaar');
        this.password = '';
        this.password_confirmation = '';
      }
    }
}

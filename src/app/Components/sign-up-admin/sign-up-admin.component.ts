import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.css']
})
export class SignUpAdminComponent implements OnInit {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  createNewUserAsAdmin() {
    this.authService.createUserAsAdmin(this.lastName, this.firstName, this.email, this.phone, this.password)
      .subscribe(_ => this.router.navigate(['/admin_agenda']));
  }

}

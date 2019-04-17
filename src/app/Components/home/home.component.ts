import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../Services/company.service';
import {Company} from '../../Domains/company.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    company: Company;

  constructor(private service: CompanyService) {
      this.service = service;
  }

  ngOnInit() {
      this.company = this.service.getCompany();
  }

}

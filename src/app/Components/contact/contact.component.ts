import { Component, OnInit } from '@angular/core';
import {Company} from '../../Domains/company.model';
import {CompanyService} from '../../Services/company.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  company: Company;

  constructor(private service: CompanyService) {
    this.service = service;
  }

  ngOnInit() {
    this.company = this.service.getCompany();
  }

}

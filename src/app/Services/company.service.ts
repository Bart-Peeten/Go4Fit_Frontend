import { Injectable } from '@angular/core';
import {Company} from '../Domains/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    company: Company;

  constructor() {
      this.company = new Company('Go4Fit Bree',
                                'Heerbaan 20',
                                'Bree/Opitter',
                                '3960',
                                '0498 46 97 92',
                                'nickgoos@hotmail.com');
  }

  getCompany() {
      return this.company;
  }
}

import { Component, OnInit } from '@angular/core';
import {Prices} from '../../Domains/prices.model';
import {PriceService} from '../../Services/price.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
    prices: Prices[];

  constructor(private service: PriceService) { }

  ngOnInit() {
      this.prices = this.service.getPrices();
  }

}

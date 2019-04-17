import { Injectable } from '@angular/core';
import {Prices} from '../Domains/prices.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
    prices: Prices[];

  constructor() {
      this.prices = this.generatePrices();
  }

    private generatePrices() {
      const generatedPrice: Prices[] = [];
      const price1 = new Prices('10-Beurtenkaart', '€70', 'Onbeperkt geldig');
      generatedPrice.push(price1);
      const price2 = new Prices('20-Beurtenkaart', '€120', 'Onbeperkt geldig');
      generatedPrice.push(price2);
      const price3 = new Prices('3 Maandenkaart', '€300', 'Onbeperkt geldig');
      generatedPrice.push(price3);

      return generatedPrice;
    }

    getPrices() {
      return this.prices;
    }
}

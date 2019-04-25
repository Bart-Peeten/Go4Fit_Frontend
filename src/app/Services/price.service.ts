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
      const price1 = new Prices('10-Beurtenkaart', '€70', '1-jaar geldig', 'Eerste les = Proefles');
      generatedPrice.push(price1);
      const price2 = new Prices('20-Beurtenkaart', '€120', '1-jaar geldig', 'Eerste les = Proefles');
      generatedPrice.push(price2);
      const price3 = new Prices('6 Maandenkaart', '€360', '6 maanden geldig', 'Eerste les = Proefles');
      generatedPrice.push(price3);
      const price4 = new Prices('10-Beurtenkaart', '€350', '1-jaar geldig', 'Gratis intake');
      generatedPrice.push(price4);

      return generatedPrice;
    }

    getPrices() {
      return this.prices;
    }
}

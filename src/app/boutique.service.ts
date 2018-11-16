import { Injectable } from '@angular/core';

import {Commerce} from './Model/Commerce';


@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private boutiquesUrl = 'api/boutiques';  // URL to web api

  commerces: Commerce[] = [
    {
      "commerceId": 1,
      "nomCommerce": "Garden Cart",
    },
    {
      "commerceId": 2,
      "nomCommerce": "Hammer",
    },
    {
      "commerceId": 3,
      "nomCommerce": "H&M",
    },
    {
      "commerceId": 4,
      "nomCommerce": "Pizza hut",
    },
  ];
  constructor(
  ) { }

  getCommerces():Commerce[]{
    return this.commerces;
  }

  getCommerce(id:number):Commerce{
    return this.commerces.find(commerce => commerce.commerceId === id);
  }

  updateCommerce(commerce:Commerce):void{
    this.commerces[this.commerces.indexOf(commerce)] = commerce;
  }
}

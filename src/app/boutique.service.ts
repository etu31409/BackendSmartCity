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
      "adresse":
      {
        "rue": "Rue de fer",
        "codePostal":"5000",
        "numero": 12
      }
    },
    {
      "commerceId": 2,
      "nomCommerce": "Hammer",
      "adresse":
      {
        "rue": "Rue Godefroid",
        "codePostal":"5000",
        "numero": 2
      }
    },
    {
      "commerceId": 3,
      "nomCommerce": "H&M",
      "adresse":
      {
        "rue": "Rue de fer",
        "codePostal":"5000",
        "numero": 10
      }
    },
    {
      "commerceId": 4,
      "nomCommerce": "Pizza hut",
      "adresse":
      {
        "rue": "Rue de l'Ange",
        "codePostal":"5000",
        "numero": 30
      }
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

  updateCommerce(commerce:Commerce, id:number):void{
    this.commerces[id - 1].nomCommerce = commerce.nomCommerce;
    this.commerces[id - 1].adresse.codePostal = commerce.adresse.codePostal;
    this.commerces[id - 1].adresse.numero = commerce.adresse.numero;
    this.commerces[id - 1].adresse.rue = commerce.adresse.rue;
  }
}

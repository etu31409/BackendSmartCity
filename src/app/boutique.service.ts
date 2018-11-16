import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Commerce} from './Model/Commerce';
import { ThrowStmt } from '@angular/compiler';

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
    private http: HttpClient
  ) { }

  getCommerces():Commerce[]{
    return this.commerces;
  }

  getCommerce(id:number):Commerce{
    return this.commerces.find(commerce => commerce.commerceId === id);
  }
}

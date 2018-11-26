import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private boutiquesUrl = 'api/boutiques';  // URL to web api  

  //Tableau de commerces
  commerces: Commerce[] = [
    {
      "commerceId": 1,
      "nomCommerce": "Garden Cart",
      "adresse":
      {
        "rue": "Rue de fer",
        "codePostal":"5000",
        "numero": 12
      },
      "categorie":"Magasin"
    },
    {
      "commerceId": 2,
      "nomCommerce": "Hammer",
      "adresse":
      {
        "rue": "Rue Godefroid",
        "codePostal":"5000",
        "numero": 2
      },
      "categorie":"Bar"
    },
    {
      "commerceId": 3,
      "nomCommerce": "H&M",
      "adresse":
      {
        "rue": "Rue de fer",
        "codePostal":"5000",
        "numero": 10
      },
      "categorie":"Magasin"
    },
    {
      "commerceId": 4,
      "nomCommerce": "Pizza hut",
      "adresse":
      {
        "rue": "Rue de l'Ange",
        "codePostal":"5000",
        "numero": 30
      },
      "categorie":"Restaurant"
    },
  ];

  constructor(private http:HttpClient) { }

  getCommerces():Commerce[]{
    return this.commerces;
}

  getCommerce(id:number):Commerce{
    return this.commerces.find(commerce => commerce.commerceId === id);
  }

  updateCommerce(commerce:Commerce):void{
    this.commerces[commerce.commerceId - 1].nomCommerce = commerce.nomCommerce;
    this.commerces[commerce.commerceId - 1].adresse.codePostal = commerce.adresse.codePostal;
    this.commerces[commerce.commerceId - 1].adresse.numero = commerce.adresse.numero;
    this.commerces[commerce.commerceId - 1].adresse.rue = commerce.adresse.rue;
  }

  deleteCommerce(commerce : Commerce): void{
    this.commerces.splice(this.commerces.indexOf(commerce),1);
  }

  getCommercesObservables(): Observable<Commerce[]>{
    return this.http.get<Commerce[]>(`http://localhost:5000/api/Commerces`);
  }

  getCommercesFakeDate():Observable<Commerce[]>{
    return this.http.get<Commerce[]>("./assets/fakedata.json")
    .pipe(map(commerce => Object.assign(new Commerce(), commerce)));  
  }
}

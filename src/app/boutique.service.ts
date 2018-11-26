import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from './Model/User';
import { RootObject } from './Model/backEndSmartCity';
import { Categorie } from './Model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private boutiquesUrl = 'api/boutiques';  // URL to web api  

  //$ → Convention pour signifier une liste d'Observables
  commerces$ : Observable<Commerce[]>;
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
      "categorie":
      {
        "libelle":"Magasin",
        "categorieMere":null
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
      },
      "categorie":
      {
        "libelle":"Bar",
        "categorieMere":null
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
      },
      "categorie":
      {
        "libelle":"Magasin", "categorieMere":null
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
      },
      "categorie":
      {
        "libelle":"Restaurant", "categorieMere":null
      }
    }
  ];

  users:User = 
    {
      "id":2,
      "nom":"Legris",
      "prenom":"Gandalf",
      "numeroDeTelephone":47347887,
      "motDePasse":"123test",
      "estCommercant":true,
      "adresseMail":"legrisGandalf@gmail.com",
      "role":"admin"
    };

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
    this.commerces$ = this.http.get<RootObject>("./assets/fakedata.json")
    .pipe(
      map(
        tabCommerces => tabCommerces.commerces
        )
      );
    return this.commerces$;   
  }

  checkUser(login:string, motDePasse:string):boolean{
    //devra faire appel à l'API, si l'api renvoit les bon token c'est bon
    return true;
  }

  getUser():User{
    return this.users;
  }
}

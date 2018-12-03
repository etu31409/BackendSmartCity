import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from './Model/User';
import { RootObject } from './Model/backEndSmartCity';
import { Categorie } from './Model/Categorie';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private baseUrlApi = "https://sc-nconnect.azurewebsites.net/api/";
  //private baseUrlApi = "http://localhost:5000/api/";
  private boutiquesUrl = 'api/boutiques';  // URL to web api  
  private  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + this.auth.getToken()
    })
  };

  //$ → Convention pour signifier une liste d'Observables
  commerces$ : Observable<Commerce[]>;
  commerces: Commerce[] = [
    {
      "commerceId": 1,
      "nomCommerce": "Garden Cart",
      "rue": "Rue de fer",
      "numero":10,
      "Idcategorie":
      {
        "libelle":"Magasin",
        "idCategorie":1
      }
    },
    {
      "commerceId": 2,
      "nomCommerce": "Hammer",
      "rue": "Rue Godefroid",
      "numero":10,
      "Idcategorie":
      {
        "libelle":"Bar",
        "idCategorie":2
      }
    },
    {
      "commerceId": 3,
      "nomCommerce": "H&M",
      "rue": "Rue de fer",
      "numero": 10
      ,
      "Idcategorie":
      {
        "libelle":"Magasin", 
        "idCategorie":1
      }
    },
    {
      "commerceId": 4,
      "nomCommerce": "Pizza hut",
      "rue": "Rue de l'Ange",
      "numero": 30
      ,
      "Idcategorie":
      {
        "libelle":"Restaurant", 
        "idCategorie":1
      }
    }
  ];
  ngOnInit() {
     
  }
  constructor(private http:HttpClient, private auth:AuthService) { }

  
  getCommerces():Commerce[]{
    return this.commerces;
}

  getCommerce(id:number):Observable<Commerce>{
    //return this.commerces.find(commerce => commerce.commerceId === id);
    return this.http.get<Commerce>(`${this.baseUrlApi}Commerces/${id}`, this.httpOptions);

  }

  updateCommerce(commerce:Commerce):void{
    this.commerces[commerce.commerceId - 1].nomCommerce = commerce.nomCommerce;
    this.commerces[commerce.commerceId - 1].numero = commerce.numero;
    this.commerces[commerce.commerceId - 1].rue = commerce.rue;
  }

  deleteCommerce(commerce : Commerce): void{
    this.commerces.splice(this.commerces.indexOf(commerce),1);
  }

  getCommercesObservables(): Observable<Commerce[]>{
    return this.http.get<Commerce[]>(`${this.baseUrlApi}Commerces`, this.httpOptions)
    ;
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
}

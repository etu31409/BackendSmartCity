import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from './Model/User';
import { RootObject } from './Model/backEndSmartCity';
import { Categorie } from './Model/Categorie';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private baseUrlApi = "https://sc-nconnect.azurewebsites.net/api/";
  private boutiquesUrl = 'api/boutiques';  // URL to web api  
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'Bearer ' + localStorage.getItem("token")
    })
  };

  //$ → Convention pour signifier une liste d'Observables
  commerces$ : Observable<Commerce[]>;
  ngOnInit() {
     
  }
  constructor(private http:HttpClient) { }

  getCommerce(id:number):Observable<Commerce>{
    return this.http.get<Commerce>(`${this.baseUrlApi}Commerces/${id}`, this.httpOptions);

  }

  addCommerce(commerce:Commerce):Observable<Commerce>{
    return this.http.post<Commerce>(`${this.baseUrlApi}Commerces`, commerce, this.httpOptions);
  }

  updateCommerce(commerce:Commerce):Observable<Commerce>{
    return this.http.put<Commerce>(`${this.baseUrlApi}Commerces/${commerce.idCommerce}`, commerce, this.httpOptions);
  }

  deleteCommerce(commerce : Commerce): Observable<Commerce>{
    return this.http.delete<Commerce>(`${this.baseUrlApi}Commerces/${commerce.idCommerce}`, this.httpOptions);
  }

  getCommercesObservables(): Observable<Commerce[]>{
    return this.http.get<Commerce[]>(`${this.baseUrlApi}Commerces?categorie=0`, this.httpOptions)
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

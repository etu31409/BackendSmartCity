import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { RootObject } from './Model/backEndSmartCity';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private baseUrlApi = "https://sc-nconnect.azurewebsites.net/api/";
  private boutiquesUrl = 'api/boutiques';  // URL to web api  
  private token:number;
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'Bearer ' + localStorage.getItem("token")
    })
  };

  //$ → Convention pour signifier une liste d'Observables
  commerces$ : Observable<Commerce[]>;
  ngOnInit() {
    const myObserver = {
      next: x => {
        this.token = x,
        console.log("Token à jour !")
      },
      complete: () => this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  'Bearer ' + this.token
        })
      }
    };

    this.authService.notify().subscribe(
      myObserver
    );
  }

  constructor(private http:HttpClient, private authService:AuthService) { }

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

  getCommerces(): Observable<Commerce[]>{
    return this.http.get<Commerce[]>(`${this.baseUrlApi}Commerces?categorie=0&all=false`, this.httpOptions);
  }
}

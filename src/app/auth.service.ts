import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Commerce} from './Model/Commerce';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from './Model/User';
import { RootObject } from './Model/backEndSmartCity';
import { Categorie } from './Model/Categorie';
import { HttpHeaders } from '@angular/common/http';
import { Token } from './Model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private baseUrlApi = "http://localhost:5000/api/";
  private baseUrlApi = "https://sc-nconnect.azurewebsites.net/api/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private token:string;
  constructor(private http:HttpClient) { }

  loginUser(login:string, motDePasse:string){
    let body="{\n" +
    "\t\"Username\":\""+login+"\",\n" +
    "\t\"Password\":\""+motDePasse+"\"\n" +
    "}";
    this.http.post<Token>(`${this.baseUrlApi}jwt`, body, this.httpOptions).subscribe(res =>{
      console.log(res);
      this.token = res.access_token;
      localStorage.removeItem("token");
      localStorage.setItem("token", this.token);
    });
    
  }

  getToken():string{
    return this.token;
  }
}

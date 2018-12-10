import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from './Model/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = "token";
  private baseUrlApi = "https://sc-nconnect.azurewebsites.net/api/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private token:string;
  private myObservable:Observable<number>;
  constructor(private http:HttpClient, private router:Router) { }

  loginUser(login:string, motDePasse:string){
    let body="{\n" +
    "\t\"Username\":\""+login+"\",\n" +
    "\t\"Password\":\""+motDePasse+"\"\n" +
    "}";
    this.http.post<Token>(`${this.baseUrlApi}jwt`, body, this.httpOptions).subscribe(res =>{
      console.log(res);
      this.token = res.access_token;
      localStorage.setItem(this.TOKEN_KEY, this.token);
      this.router.navigate(['/connecte']);
      this.myObservable = Observable.create(
        observer=>{
          this.token;
        }
      );
    });
  }

  notify():Observable<number>{
    //creer un observable pour notifier boutiqueService que le token à changé
    return this.myObservable;
  }

  getToken():string{
    return this.token;
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

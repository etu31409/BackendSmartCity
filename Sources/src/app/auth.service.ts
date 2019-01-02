import { Injectable } from '@angular/core';
import { Observable, Subscriber} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from './Model/token';
import { Router } from '@angular/router';
import { Constantes } from './Constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private token:string;
  private myObservable:Observable<number>;
  private tokenObservable:Observable<string>;
  private tokenSubscriber: Subscriber<string>;
  
  constructor(private http:HttpClient, private router:Router) {
    this.tokenObservable=
    Observable.create(subscriber=>{
      this.tokenSubscriber=subscriber;
    });
   }

  loginUser(login:string, motDePasse:string){
    let body="{\n" +
    "\t\"Username\":\""+login+"\",\n" +
    "\t\"Password\":\""+motDePasse+"\"\n" +
    "}";
    this.http.post<Token>(`${Constantes.URL_API}jwt`, body, this.httpOptions).subscribe(res =>{
      console.log(res);
      this.token = res.access_token;
      this.tokenSubscriber.next(res.access_token);
      localStorage.setItem(Constantes.TOKEN_ID, (res.access_token));
      this.router.navigate(['/connecte']);
    });
  }

  notify():Observable<string>{
    return this.tokenObservable;
  }


  isAuthenticated():boolean{
    return !!localStorage.getItem(Constantes.TOKEN_ID);
  }

  logout(){
    localStorage.removeItem(Constantes.TOKEN_ID);
  }
}

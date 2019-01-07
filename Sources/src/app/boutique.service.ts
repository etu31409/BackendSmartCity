import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commerce } from './Model/Commerce';
import { OpeningPeriod } from './Model/OpeningPeriod';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Constantes } from './Constantes';
import { User } from './Model/User';
import { Actualite } from './Model/Actualite';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(Constantes.TOKEN_ID)
    })
  };
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.notify().subscribe(
      token => {
        console.log("Token mis à jour: " + token);
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          })
        };
      }
    );
  }

  getCommerce(id: number): Observable<Commerce> {
    return this.http.get<Commerce>(`${Constantes.URL_API}Commerces/${id}`, this.httpOptions);

  }

  addCommerce(commerce: Commerce): Observable<Commerce> {
    return this.http.post<Commerce>(`${Constantes.URL_API}Commerces`, commerce, this.httpOptions);
  }

  updateCommerce(commerce: Commerce): Observable<Commerce> {
    return this.http.put<Commerce>(`${Constantes.URL_API}Commerces`, commerce, this.httpOptions);
  }

  deleteCommerce(commerce: Commerce): Observable<Commerce> {
    return this.http.delete<Commerce>(`${Constantes.URL_API}Commerces/${commerce.idCommerce}`, this.httpOptions);
  }

  getCommerces(): Observable<Commerce[]> {
    /*
    return this.http.get<Commerce[]>(`${Constantes.URL_API}Commerces?categorie=0&all=false`, this.httpOptions)
    .pipe(
      map(commerces => commerces.map(commerce => Object.assign(new Commerce(), commerce)))
    );
    */
    //console.log(this.httpOptions.headers.get("Authorization"));
    return this.http.get<Commerce[]>(`${Constantes.URL_API}Commerces?categorie=0&all=false`, this.httpOptions);
  }

  addImage(file: any, idCommerce: number): Observable<any> {
    var Options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem(Constantes.TOKEN_ID)
      })
    };
    if(!file || file.length===0)
      return;
    const formData: FormData = new FormData();
    formData.append('file', file[0], file[0].name);
    //idCommerce.toString() -> l'API reçoit ""
  
    formData.append('IdCommerce', ""+idCommerce, file[0].name);
    return this.http.post<ImageCommerce>(`${Constantes.URL_API}Image`, formData, Options);
  }

  deleteImage(idImage: number, idCommerce: number): Observable<ImageCommerce> {
    return this.http.delete<ImageCommerce>(`${Constantes.URL_API}Image?idImage=${idImage}&idCommerce=${idCommerce}`, this.httpOptions);
  }

  updateOpeningPeriod(elem: OpeningPeriod): Observable<OpeningPeriod> {
    return this.http.put<OpeningPeriod>(`${Constantes.URL_API}OpeningPeriods/${elem.idHoraire}`, elem, this.httpOptions)
  }
  deleteOpeningPeriod(elem: OpeningPeriod): Observable<OpeningPeriod> {
    return this.http.delete<OpeningPeriod>(`${Constantes.URL_API}OpeningPeriods/${elem.idHoraire}`, this.httpOptions);
  }
  addOpeningPeriod(elem: OpeningPeriod): Observable<OpeningPeriod> {
    return this.http.post<OpeningPeriod>(`${Constantes.URL_API}OpeningPeriods/Shop/${elem.idCommerce}`, elem, this.httpOptions);
  }
  getOpeningPeriod(id: number): Observable<OpeningPeriod> {
    return this.http.get<OpeningPeriod>(`${Constantes.URL_API}OpeningPeriods/${id}`, this.httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${Constantes.URL_API}Users/${id}`, this.httpOptions);
  }

  deleteActualite(elem: Actualite): Observable<Actualite> {
    return this.http.delete<Actualite>(`${Constantes.URL_API}Actualites/${elem.idActualite}`, this.httpOptions);
  }
  addActualite(elem: Actualite): Observable<Actualite> {
    return this.http.post<Actualite>(`${Constantes.URL_API}Actualites`, elem, this.httpOptions);
  }
  updateActualite(elem: Actualite): Observable<Actualite> {
    return this.http.put<Actualite>(`${Constantes.URL_API}Actualites/${elem.idActualite}`, elem, this.httpOptions)
  }
  getActualite(id: number): Observable<Actualite> {
    return this.http.get<Actualite>(`${Constantes.URL_API}Actualites/${id}`, this.httpOptions);
  }

  throwNewRequestGoogleFirebase(actulite:Actualite, nomCommerce:string): Observable<any>{
    let body={
      "to": 
        "/topics/" + nomCommerce.replace(" ", "")
      ,
      "data": {
        "extra_information": "Notification envoyé depuis Angular"
      },
      "notification": {
        "title": nomCommerce + " vient de publier une nouvelle annonce !",
        "text": actulite.libelle + ", " + actulite.texte
      }
    };
    var Options = {
      headers: new HttpHeaders({
        'Authorization': 'Key=AAAAkYhaPt8:APA91bFxofTu12BqO49ttL-wlGdWakXEH3D997uVNBsUWLUsNfzjN7qMGN5Pf-JSJ_P2X0JB-g2xEXOonBNQfO_sC1R6BxCt8mLYHPQsLjFcAkmZqNuBJdXZOIoMHUEbaa_YCng840tZ',
        'Content-Type': 'application/json'
        })
    };
    return this.http.post<any>(`https://fcm.googleapis.com/fcm/send`, body, Options);
  }
}

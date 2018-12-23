import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),  
    motDePasse: new FormControl('', Validators.required)
  });
  //on instancie boutique service içi pour s'abonner à l'observable dans authservice 
  //(dans le constructeur de BoutiqueService, on s'abonne à l'observalbe via notify()), 
  //sinon pas possible de créer un Subscriber
  //si pas personne ne s'est abonné à lui
  constructor(private authService:AuthService, private boutiqueService: BoutiqueService) { }

  ngOnInit() {
  }

  checkUser(){
    var login = this.loginForm.get("login").value;
    var motDePasse = this.loginForm.get("motDePasse").value;
    this.authService.loginUser(login, motDePasse);
  }
}

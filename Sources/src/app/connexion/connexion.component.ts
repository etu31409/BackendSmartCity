import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { CompteComponent } from '../compte/compte.component';

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
  private compteComponent:CompteComponent;
  //on instancie boutique service içi pour s'abonner à l'observable dans authservice 
  //(dans le constructeur de BoutiqueService, on s'abonne à l'observalbe via notify()), 
  //sinon pas possible de créer un Subscriber
  //si personne ne s'est abonné à lui au préalable
  constructor(private authService:AuthService, private boutiqueService: BoutiqueService) { 

  }

  ngOnInit() {
  }
  
  checkUser(){
    var login = this.loginForm.get("login").value;
    var motDePasse = this.loginForm.get("motDePasse").value;
    this.authService.loginUser(login, motDePasse);
  }
}

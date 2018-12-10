import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  checkUser(){
    var login = this.loginForm.get("login").value;
    var motDePasse = this.loginForm.get("motDePasse").value;
    this.authService.loginUser(login, motDePasse);
  }
}

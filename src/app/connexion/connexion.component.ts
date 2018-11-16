import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }

}

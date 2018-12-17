import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connecte',
  templateUrl: './connecte.component.html',
  styleUrls: ['./connecte.component.css']
})
export class ConnecteComponent implements OnInit {
  //quand on récupère le clients, on vérifie si c'est des commerces ou office du tourisme
  title:string="Mes commerces";
  commerces: Commerce[];

  constructor(
    private boutiqueService:BoutiqueService, private router:Router) { }

  ngOnInit() {
    this.getCommerces();
  }

  getCommerces():void{
    this.boutiqueService.getCommerces().subscribe(
      commerces => {
        this.commerces = commerces;
        console.log(this.commerces);
      },
      error => {
        alert((error.status == 401) ? "Votre session est expiré !" : "Une erreur a été rencontré !");
        this.router.navigate(['/connexion']);
      }
    );
    
  }
}

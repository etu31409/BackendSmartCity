import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';

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
    private boutiqueService:BoutiqueService) { }

  ngOnInit() {
    this.getCommerces();
  }

  getCommerces():void{
    this.boutiqueService.getCommerces().subscribe(
      commerces => {
        this.commerces = commerces;
        console.log(this.commerces);
      }
    );
    
  }
}

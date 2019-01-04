import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
import { Router } from '@angular/router';
import { Utils } from '../Utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connecte',
  templateUrl: './connecte.component.html',
  styleUrls: ['./connecte.component.css']
})
export class ConnecteComponent implements OnInit {
  title:string="Mes commerces";
  commerces: Commerce[];

  constructor(
    private boutiqueService:BoutiqueService, private router:Router, private authService:AuthService) { }

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
        this.authService.logout();
        Utils.errorHandler(error.status);
        this.router.navigate(['/connexion']);
      }
    );
    
  }
}

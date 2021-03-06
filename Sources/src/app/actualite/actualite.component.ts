import { Component, OnInit, Input } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { Actualite } from '../Model/Actualite';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Utils } from '../Utils';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  @Input() actualite:Actualite[];
  @Input() idCommerce:number;
  constructor(private boutiqueService:BoutiqueService, private router: Router, private location: Location) { }

  ngOnInit() {}

  routeToActualiteDetail(){
    this.router.navigate(['/editer-actualite', 0, this.idCommerce]);
  }

  delActualite(elem){
    this.boutiqueService.deleteActualite(elem).subscribe(
      elem =>{
        window.location.reload();
      },
      error => {
        Utils.errorHandler(error.status);
        this.router.navigate(['/editer', this.idCommerce]);
      }
    );
  }

  formatDate(date:Date){
    var dateActu = new Date(date);
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return dateActu.toLocaleString("fr-FR", options);
  }
}

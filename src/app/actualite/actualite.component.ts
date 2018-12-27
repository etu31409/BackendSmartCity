import { Component, OnInit, Input } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { Actualite } from '../Model/Actualite';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  @Input() actualite:Actualite[];
  @Input() idCommerce:number;
  constructor(private boutiqueService:BoutiqueService) { }

  ngOnInit() {
    
  }

  delActualite(elem){
    this.boutiqueService.deleteActualite(elem).subscribe();
    //recharger la page ou relancer un getCommerce pour que la liste des commerces soit à jour
  }
}

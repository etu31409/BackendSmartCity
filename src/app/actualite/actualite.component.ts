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

  constructor(private boutiqueService:BoutiqueService) { }

  ngOnInit() {
    
  }

  delActualite(elem){
    this.boutiqueService.deleteActualite(elem).subscribe();
  }
}

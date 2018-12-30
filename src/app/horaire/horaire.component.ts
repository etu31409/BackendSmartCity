import { Component, OnInit, Input } from '@angular/core';
import { OpeningPeriod } from '../Model/OpeningPeriod';
import { FormGroup, FormControl } from '@angular/forms';
import { BoutiqueService } from '../boutique.service';
import { Horaire } from '../Model/Horaire';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent implements OnInit {
@Input() openingPeriod:OpeningPeriod[];
@Input() idCommerce:number;
private tabJour = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  private openingPeriodForm = new FormGroup({
      heureDebut: new FormControl(''),
      heureFin : new FormControl(''),
    }
  );

  constructor(
    private boutiqueService: BoutiqueService
  ) { }

  ngOnInit() {
  }

  jour(numJour:number):string{
    let jour="";
    switch(numJour){
      case 0: jour="Dimanche";
        break;
      case 1: jour="Lundi";
        break;
      case 2: jour="Mardi";
        break;
      case 3 : jour="Mercredi";
        break;  
      case 4 : jour="Jeudi";
        break;
      case 5 : jour="Vendredi";
        break;
      case 6 : jour="Samedi";
        break;
      default : jour="Pas de jour lisible";
    }
    return jour;
  }
}

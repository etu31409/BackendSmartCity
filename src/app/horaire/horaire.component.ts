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
      case 1: jour="Lundi";
      case 2: jour="Mardi";
      case 3 : jour="Mercredi";
      case 4 : jour="Jeudi";
      case 5 : jour="Vendredi";
      case 6 : jour="Samedi";
      default : jour="Dimanche";
    }
    return jour;
  }

  //TODO: Refresh page Apres avoir effectué une action

  newOpeningPeriod(){
    var elem;
    this.boutiqueService.addOpeningPeriod(elem).subscribe();
  }

  modifOpeningPeriod(elem : OpeningPeriod):void{
    this.boutiqueService.updateOpeningPeriod(elem).subscribe();
  }

  delOpeningPeriod(elem : OpeningPeriod):void{
    this.boutiqueService.deleteOpeningPeriod(elem).subscribe();
  }
}

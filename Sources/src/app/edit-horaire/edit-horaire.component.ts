import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { OpeningPeriod } from '../Model/OpeningPeriod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../Utils';
import { Constantes } from '../Constantes';

@Component({
  selector: 'app-edit-horaire',
  templateUrl: './edit-horaire.component.html',
  styleUrls: ['./edit-horaire.component.css']
})
export class EditHoraireComponent implements OnInit {
  private tabJour = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];


  editOpeningPeriod = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required)
  });

  private openingPeriod: OpeningPeriod;
  private idCommerce: number;
  private jourSelectionne:string;
  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getOpeningPeriod();
  }

  getOpeningPeriod(): void{
    //si nouveau horaire, va mettre 0 dans l'url, aucun commerce n'a 0 comme identifiant
    const id = +this.route.snapshot.paramMap.get('id');
    this.idCommerce = +this.route.snapshot.paramMap.get('idCommerce');
    if (id != 0) {
      this.boutiqueService.getOpeningPeriod(id).subscribe(op => {
        this.openingPeriod = op;
        if (this.openingPeriod != null) {
          this.preFillForm();
        }
      });
    }
  }

  preFillForm(): void{
    this.editOpeningPeriod.patchValue({
      start: this.openingPeriod.horaireDebut,
      end: this.openingPeriod.horaireFin,
      day: this.openingPeriod.jour
    });
    if(this.openingPeriod.jour >= 0){
      this.jourSelectionne = this.tabJour[this.openingPeriod.jour];
    } 
  }

  goBack(): void {
    this.router.navigate(['/editer', this.idCommerce]);
  }

  save(){
    let isNewOpeningPeriod = false;
    if (this.openingPeriod == null) {
      this.openingPeriod = new OpeningPeriod();
      isNewOpeningPeriod = true;
    }
    
    this.openingPeriod.horaireDebut = this.editOpeningPeriod.get("start").value;
    this.openingPeriod.horaireFin = this.editOpeningPeriod.get("end").value;
    if(this.openingPeriod.horaireDebut > this.openingPeriod.horaireFin){
      alert(Constantes.BAD_OPENINGPERIOD);
      return false;
    }
    this.openingPeriod.jour = this.tabJour.indexOf(this.editOpeningPeriod.get("day").value);
    this.openingPeriod.idCommerce = this.idCommerce;
    
    if (!isNewOpeningPeriod) {
      this.boutiqueService.updateOpeningPeriod(this.openingPeriod).subscribe(
        elem =>{
          this.goBack();
        },
        error => {
          Utils.errorHandler(error.status);
          this.router.navigate(['/connexion']);
        }
      );
    }
    else {
      this.boutiqueService.addOpeningPeriod(this.openingPeriod).subscribe(
        elem=>{
          this.goBack();
        },
        error => {
          Utils.errorHandler(error.status);
          this.router.navigate(['/connexion']);
        }
      );
    }
    
  }

}

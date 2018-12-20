import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { OpeningPeriod } from '../Model/OpeningPeriod';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-horaire',
  templateUrl: './edit-horaire.component.html',
  styleUrls: ['./edit-horaire.component.css']
})
export class EditHoraireComponent implements OnInit {

  editOpeningPeriod = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required)
  });

  openingPeriod: OpeningPeriod;

  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOpeningPeriod();
  }

  getOpeningPeriod(): void{
    //si nouveau horaire, va mettre 0 dans l'url, aucun commerce n'a 0 comme identifiant
    const id = +this.route.snapshot.paramMap.get('id');
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
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    let isNewOpeningPeriod = false;
    if (this.openingPeriod == null) {
      this.openingPeriod = new OpeningPeriod();
      isNewOpeningPeriod = true;
    }
    if (isNewOpeningPeriod) this.openingPeriod.idHoraire = null;

    this.openingPeriod.horaireDebut = this.editOpeningPeriod.get("start").value;
    this.openingPeriod.horaireFin = this.editOpeningPeriod.get("end").value;
    this.openingPeriod.jour = this.editOpeningPeriod.get("day").value;

    if (!isNewOpeningPeriod) {
      this.boutiqueService.updateOpeningPeriod(this.openingPeriod).subscribe();
    }
    else {
      this.openingPeriod.rowVersion = null;
      this.boutiqueService.addOpeningPeriod(this.openingPeriod).subscribe();
    }
    this.goBack();
  }

}

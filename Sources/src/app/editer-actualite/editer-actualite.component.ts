import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { Actualite } from '../Model/Actualite';
import { Location } from '@angular/common';
import { Utils } from '../Utils';

@Component({
  selector: 'app-editer-actualite',
  templateUrl: './editer-actualite.component.html',
  styleUrls: ['./editer-actualite.component.css']
})
export class EditerActualiteComponent implements OnInit {
  private actualite:Actualite;
  private idCommerce:number;
  private editActualiteForm = new FormGroup({
    libelle : new FormControl('', Validators.required),
    texte: new FormControl(''),
    dateActu: new FormControl('mm/dd/yyyy')
  });
  private today: Date;
  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.today = new Date();
    this.getActualite();
  }
  getActualite(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.idCommerce = +this.route.snapshot.paramMap.get('idCommerce');
    if (id != 0) {
      this.boutiqueService.getActualite(id).subscribe(actu => {
        this.actualite = actu;
        if (this.actualite != null) {
          this.preFillForm();
        }
      });
    }
  }
  preFillForm(): void{
    this.editActualiteForm.patchValue({
      libelle: this.actualite.libelle,
      texte: this.actualite.texte
    });
  }

  goBack(): void {
    //this.location.back();
    this.router.navigate(['/editer', this.idCommerce]);
  }

  save():void{
    let isNewActualite = false;
    if(this.actualite == null)
    {
      this.actualite = new Actualite();
      isNewActualite = true;
    }  
    
    this.actualite.idCommerce = this.idCommerce;
    this.actualite.libelle = this.editActualiteForm.get("libelle").value;
    this.actualite.texte = this.editActualiteForm.get("texte").value;
    let date:string = this.editActualiteForm.controls.dateActu.value;
    this.actualite.date = new Date(this.editActualiteForm.controls.dateActu.value);
    if(isNewActualite){
      this.boutiqueService.addActualite(this.actualite).subscribe(
        elem =>{
          this.goBack();
        },
        error => {
          Utils.errorHandler(error.status);
          this.router.navigate(['/connexion']);
        }
      );
    }
    else{
      this.boutiqueService.updateActualite(this.actualite).subscribe(
        elem =>{
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

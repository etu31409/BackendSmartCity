import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { Actualite } from '../Model/Actualite';
import { Location } from '@angular/common';
import { Utils } from '../Utils';
import { AuthService } from '../auth.service';
import { Commerce } from '../Model/Commerce';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-editer-actualite',
  templateUrl: './editer-actualite.component.html',
  styleUrls: ['./editer-actualite.component.css']
})
export class EditerActualiteComponent implements OnInit {
  private canCheckForm = false;
  private actualite:Actualite;
  private idCommerce:number;
  private editActualiteForm = new FormGroup({
    libelle : new FormControl('', [Validators.required, Validators.maxLength(30)]),
    texte: new FormControl('', Validators.maxLength(50)),
    dateActu: new FormControl('mm/dd/yyyy')
  });
  private commerce:Commerce;
  private today: Date;
  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private location: Location,
    private router: Router,
    private authService:AuthService) { }

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
    //recupérer le commerce pour le passer à throwNewRequestGoogleFirebase afin d'afficher le libellé du commerce dans le titre
    this.boutiqueService.getCommerce(this.idCommerce).subscribe(
      commerce => this.commerce = commerce
    );
  }
  preFillForm(): void{
    this.editActualiteForm.patchValue({
      libelle: this.actualite.libelle.trim(),
      texte: this.actualite.texte.trim()
    });
    //met canCheckForm à true;
    this.canCheckForm = true;
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
    this.actualite.date = new Date(this.editActualiteForm.controls.dateActu.value);
    if(isNewActualite){
      this.canCheckForm = true;
      this.boutiqueService.addActualite(this.actualite).subscribe(
        elem =>{
          this.goBack();
          this.boutiqueService.throwNewRequestGoogleFirebase(this.actualite, this.commerce.nomCommerce).subscribe();
        },
        error => {
          this.errorHandler(error);
        }
      );
    }
    else{
      this.boutiqueService.updateActualite(this.actualite).subscribe(
        elem =>{
          this.goBack();
        },
        error => {
          this.errorHandler(error);
        }
      );
    }
  }

  errorHandler(error: any) {
    if(error.status ==400) alert(error.error.Message);
    else Utils.errorHandler(error.status);
    if (error.status == 401 || error.status == 0) {
      this.authService.logout();
      this.router.navigate(['/connexion']);
    }
    this.router.navigate(['/editer', this.idCommerce]);
  }
}

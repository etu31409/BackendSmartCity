import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { Actualite } from '../Model/Actualite';
import { Location } from '@angular/common';

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
    texte: new FormControl('')
  });
  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private location: Location) { }

  ngOnInit() {
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
    this.location.back();
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
    if(isNewActualite){
      this.boutiqueService.addActualite(this.actualite).subscribe();
    }
    else{
      this.boutiqueService.updateActualite(this.actualite).subscribe();
    }
  }
}

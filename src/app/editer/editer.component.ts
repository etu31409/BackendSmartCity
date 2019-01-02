import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../Utils';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  telephoneMobile = new FormControl('');
  telephoneFixe = new FormControl('');
  description = new FormControl('');
  produitPhare = new FormControl('');
  parcoursProduitPhare = new FormControl('');
  urlPageFacebook = new FormControl('');
  formCategorie = new FormGroup(
    {
      categorie: new FormControl('', Validators.required)
    });
  commerce: Commerce;

  file = new FormControl('');

  editCommerceForm = new FormGroup({
    nomCommerce: new FormControl('', Validators.required),
    rue: new FormControl('', Validators.required),
    numero: new FormControl('', [Validators.minLength(1), Validators.required]),
    adresseMail: new FormControl('', Validators.required),
  });
  uploadImage = new FormGroup({});

  //TODO récupérer les catégorie depuis l'API
  categories = [
    {
      nom: "Restaurant"
    },
    {
      nom: "Magasin"
    },
    {
      nom: "Bar"
    }
  ];
  private categorieSelectionnee;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCommerce();
  }

  getCommerce(): void {
    //si nouveau commerce, va mettre 0 dans l'url, aucun commerce n'a 0 comme identifiant
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != 0) {
      this.boutiqueService.getCommerce(id).subscribe(commerce => {
        this.commerce = commerce;
        if (this.commerce != null) {
          this.preFillForm();
        }
      });
    }
  }

  preFillForm(): void {
    this.editCommerceForm.patchValue({
      nomCommerce: this.commerce.nomCommerce,
      rue: this.commerce.rue,
      numero: this.commerce.numero,
      adresseMail: this.commerce.adresseMail,
    });
    //maj de la catégorie
    // this.formCategorie.setValue({
    //   categorie: this.commerce.idCategorie
    //   //categorie: this.categories[2]
    // });
    //this.formCategorie.controls['categorie'].setValue(this.commerce.idCategorie, {onlySelf: true})
    if(this.commerce.idCategorie) this.categorieSelectionnee = this.categories[this.commerce.idCategorie -1];
    this.telephoneMobile.patchValue(this.commerce.numeroGsm);
    this.telephoneFixe.patchValue(this.commerce.numeroFixe);
    this.description.patchValue(this.commerce.description);
    this.produitPhare.patchValue(this.commerce.produitPhare);
    this.parcoursProduitPhare.patchValue(this.commerce.parcoursProduitPhare);
    this.urlPageFacebook.patchValue(this.commerce.urlPageFacebook);
  }


  goBack(): void {
    //this.location.back();
    this.router.navigate(['/connecte']);
  }

  save(): void {
    let isNewCommerce = false;
    if (this.commerce == null) {
      this.commerce = new Commerce();
      isNewCommerce = true;
    }
    //if (isNewCommerce) this.commerce.idCommerce = null;

    this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
    this.commerce.rue = this.editCommerceForm.get("rue").value;
    this.commerce.numero = this.editCommerceForm.get("numero").value;
    this.commerce.adresseMail = this.editCommerceForm.get("adresseMail").value;
    this.commerce.idCategorie = this.categoryName(this.formCategorie.get("categorie").value.nom);
    this.commerce.description = this.description.value;
    this.commerce.idUser = Utils.getUserId();
    this.commerce.numeroFixe = this.telephoneFixe.value;
    this.commerce.numeroGsm = this.telephoneMobile.value;
    this.commerce.parcoursProduitPhare = this.parcoursProduitPhare.value;
    this.commerce.produitPhare = this.produitPhare.value;
    this.commerce.urlPageFacebook = this.urlPageFacebook.value;

    if (!isNewCommerce) {
      this.boutiqueService.updateCommerce(this.commerce).subscribe(
        elem =>{
          this.goBack();
        }
      );
    }
    else {
      //this.commerce.rowVersion = null;
      this.boutiqueService.addCommerce(this.commerce).subscribe(
        elem => {
          this.goBack();
        }
      );
    }
  }

  delete(): void {
    this.boutiqueService.deleteCommerce(this.commerce).subscribe();
    this.goBack();
  }

  deleteImage(idImage: number): void{
    this.boutiqueService.deleteImage(idImage, this.commerce.idCommerce).subscribe();
  }

  upload(): void {
    var test = this.boutiqueService.addImage(this.file, this.commerce.idCommerce).subscribe();
  }

  categoryName(name:string):number{
    switch(name){
      case "Restaurant" :
        return 1;
      case "Magasin" :
        return 2;
      case "Bar" :
        return 3;
      default:
        return 1;
    }
  }
}

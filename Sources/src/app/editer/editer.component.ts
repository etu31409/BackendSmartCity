import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../Utils';
import { AuthService } from '../auth.service';
import { Categorie } from '../Model/Categorie';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  telephoneMobile = new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]);
  telephoneFixe = new FormControl('',[Validators.pattern('^[0-9]*$'), Validators.maxLength(9), Validators.minLength(9)]);
  description = new FormControl('');
  produitPhare = new FormControl('');
  parcoursProduitPhare = new FormControl('');
  urlPageFacebook = new FormControl('', Validators.pattern('.*www.facebook.com.*'));
  formCategorie = new FormGroup(
    {
      categorie: new FormControl('', Validators.required)
    });
  commerce: Commerce;

  editCommerceForm = new FormGroup({
    nomCommerce: new FormControl('', Validators.required),
    rue: new FormControl('', [Validators.required, Validators.minLength(5)]),
    numero: new FormControl('', [Validators.required, Validators.min(1)]),
    adresseMail: new FormControl('', [Validators.required, Validators.email]),
  });
  
  file: File[];
  uploadForm = new FormGroup({
    fichier: new FormControl(null)
  });
  private categories:Categorie[];
  //TODO récupérer les catégorie depuis l'API
  // categories = [
  //   {
  //     nom: "Restaurant"
  //   },
  //   {
  //     nom: "Magasin"
  //   },
  //   {
  //     nom: "Bar"
  //   }
  // ];
  private categorieSelectionnee;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.getCategorie();
    this.getCommerce();
  }

  getCategorie(){
    this.boutiqueService.getCategories().subscribe(
      categorie => this.categories = categorie
    );
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
        else{
          this.categorieSelectionnee = 0;
        }
      },error => {
        Utils.errorHandler(error.status);
        if(error.status == 401){
          this.authService.logout();
          this.router.navigate(['/connexion']);  
        }
        this.router.navigate(['/editer', this.commerce.idCommerce]);
      }
      
      );
    }
  }

  preFillForm(): void {
    this.editCommerceForm.patchValue({
      nomCommerce: this.commerce.nomCommerce,
      rue: this.commerce.rue,
      numero: this.commerce.numero,
      adresseMail: this.commerce.adresseMail,
    });
    if(this.commerce.idCategorie) this.categorieSelectionnee = this.categories[this.commerce.idCategorie -1];
    if(this.commerce.numeroGsm)this.telephoneMobile.patchValue('0'+this.commerce.numeroGsm);
    if(this.commerce.numeroFixe)this.telephoneFixe.patchValue('0'+this.commerce.numeroFixe);
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
    this.commerce.idCategorie = this.categoryName(this.formCategorie.get("categorie").value.libelle);
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
        },
        error => {
          this.errorHandler(error);
        }
      );
    }
    else {
      this.boutiqueService.addCommerce(this.commerce).subscribe(
        elem => {
          this.goBack();
        },
        error => {
          this.errorHandler(error);
        }
      );
    }
  }

  delete(): void {
    this.boutiqueService.deleteCommerce(this.commerce).subscribe(
      elem => {
        this.goBack();
      },
      error => {
        this.errorHandler(error);
      }
    );
  }

  deleteImage(idImage: number): void{
    this.boutiqueService.deleteImage(idImage, this.commerce.idCommerce).subscribe(
      (uploadResult) => {
        location.reload();
      }, (error) => {
        this.errorHandler(error);
      }
    );
  }

  upload(): void {
    this.boutiqueService.addImage(this.file, this.commerce.idCommerce).subscribe(
      (uploadResult) => {
        location.reload();
      }, (error) => {
        this.errorHandler(error);
      }
    );
  }

  errorHandler(error: any) {
    if(error.status ==400) alert(error.error.Message);
    else Utils.errorHandler(error.status);
    if (error.status == 401 || error.status == 0) {
      this.authService.logout();
      this.router.navigate(['/connexion']);
    }
    location.reload();
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }

  categoryName(name:string):number{
    switch(name){
      case "Magasin" :
        return 2;
      case "Bar" :
        return 3;
      default:
        return 1;
    }
  }
}

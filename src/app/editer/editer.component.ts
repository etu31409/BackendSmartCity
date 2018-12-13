import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  telephoneMobile= new FormControl('');
  telephoneFixe= new FormControl('');
  description= new FormControl('');
  produitPhare= new FormControl('');
  parcoursProduitPhare= new FormControl('');
  urlPageFacebook=new FormControl('');
  latitude= new FormControl('');
  longitude= new FormControl('');
  formCategorie = new FormGroup(
    {
      categorie :new FormControl('')
    });
  commerce: Commerce;

  editCommerceForm = new FormGroup({
    nomCommerce: new FormControl('', Validators.required),
    rue: new FormControl('', Validators.required),
    numero:new FormControl('', [Validators.minLength(1), Validators.required]),
    adresseMail: new FormControl('',Validators.required),
    
  });
  //TODO récupérer les catégorie depuis l'API
  categories = [
    {
      nom:"Restaurant"
    },
    {
      nom:"Magasin"
    },
    {
      nom:"Bar"
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getCommerce();
  }

  getCommerce(): void {
    //si nouveau commerce, va mettre 0 dans l'url, aucun commerce n'a 0 comme identifiant
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != 0)
    {
      this.boutiqueService.getCommerce(id).subscribe(commerce => 
        {
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
      adresseMail:this.commerce.adresseMail,
    });
    this.telephoneMobile.patchValue(this.commerce.numeroGSM);
    this.telephoneFixe.patchValue(this.commerce.numeroFixe);
    this.description.patchValue(this.commerce.description);
    this.produitPhare.patchValue(this.commerce.produitPhare);
    this.parcoursProduitPhare.patchValue(this.commerce.parcoursProduitPhare);
    this.urlPageFacebook.patchValue(this.commerce.urlPageFacebook);
    this.latitude.patchValue(this.commerce.latitude);
    this.longitude.patchValue(this.commerce.longitude); 
  }
  

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let isNewCommerce = false;
    if (this.commerce == null) {
      this.commerce = new Commerce();
      isNewCommerce = true;
    }
      // this.commerce.commerceId = this.boutiqueService.commerces[this.boutiqueService.commerces.length - 1].commerceId + 1;
      // this.boutiqueService.commerces.push(this.commerce);
      this.boutiqueService.getCommerces().subscribe(
        commerces => {
          //if(isNewCommerce) this.commerce.idCommerce = commerces[commerces.length - 1].idCommerce +1;
          if(isNewCommerce) this.commerce.idCommerce = null;
          this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
          this.commerce.rue = this.editCommerceForm.get("rue").value;
          this.commerce.numero = this.editCommerceForm.get("numero").value;
          this.commerce.adresseMail = this.editCommerceForm.get("adresseMail").value;
          this.commerce.idCategorie = this.formCategorie.get("categorie").value + 1;
          this.commerce.actualite = null;
          this.commerce.idCategorieNavigation = null;
          this.commerce.description = this.description.value;
          //TODO : récupérer dans les tokens du user l'id de le personne (et aussi le rôle)
          //this.commerce.idPersonne = this.authService.getIdUser();
          this.commerce.idPersonne = 1;
          this.commerce.imageCommerce = null;
          this.commerce.latitude = this.latitude.value;
          this.commerce.longitude = this.longitude.value;
          this.commerce.numeroFixe = this.telephoneFixe.value;
          this.commerce.numeroGSM = this.telephoneMobile.value;
          this.commerce.parcoursProduitPhare = this.parcoursProduitPhare.value;
          this.commerce.produitPhare = this.produitPhare.value;
          this.commerce.urlPageFacebook = this.urlPageFacebook.value;
          this.commerce.idPersonneNavigation = null;
          this.commerce.openingPeriod = null;
          if(!isNewCommerce){
            this.boutiqueService.updateCommerce(this.commerce).subscribe();
          }
          else{
            this.commerce.rowVersion = null;
            this.boutiqueService.addCommerce(this.commerce).subscribe();
          }
        }
      );
    
    // this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
    // this.commerce.rue = this.editCommerceForm.get("rue").value;
    // this.commerce.numero = this.editCommerceForm.get("numero").value;
    
    //this.goBack();
    location.reload();
    this.router.navigate(['/connecte']);
  }

  delete(): void{
    this.boutiqueService.deleteCommerce(this.commerce).subscribe();
    this.goBack();
  }
}

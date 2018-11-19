import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { Commerce, Adresse } from '../Model/Commerce';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  commerce: Commerce;
  editCommerceForm = new FormGroup({
    nomCommerce: new FormControl('', Validators.required),
    adresse: new FormGroup({
      rue: new FormControl('', Validators.required),
      //codePostal: new FormControl('', Validators.pattern('\d{4}')),
      codePostal: new FormControl('', [Validators.minLength(4), Validators.maxLength(4)]),
      numero: new FormControl('',Validators.minLength(1))
    }),
  });
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService
  ) { }

  ngOnInit() {
    this.getCommerce();
    if (this.commerce != null) {
      this.preFillForm();
    }
  }

  preFillForm(): void {
    this.editCommerceForm.patchValue({
      nomCommerce: this.commerce.nomCommerce,
      rue: this.commerce.adresse.rue,
      adresse: {
        rue: this.commerce.adresse.rue,
        numero: this.commerce.adresse.numero,
        codePostal: this.commerce.adresse.codePostal
      }
    });
  }
  getCommerce(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commerce = this.boutiqueService.getCommerce(id);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.commerce == null) {
      this.commerce = new Commerce();
      this.commerce.adresse = new Adresse();
      this.commerce.commerceId = this.boutiqueService.commerces[this.boutiqueService.commerces.length - 1].commerceId + 1;
      this.boutiqueService.commerces.push(this.commerce);
    }
    this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
    this.commerce.adresse.codePostal = this.editCommerceForm.get("adresse").get("codePostal").value;
    this.commerce.adresse.rue = this.editCommerceForm.get("adresse").get("rue").value;
    this.commerce.adresse.numero = this.editCommerceForm.get("adresse").get("numero").value;

    this.boutiqueService.updateCommerce(this.commerce);
    this.goBack();
  }

  delete(): void{
    this.boutiqueService.deleteCommerce(this.commerce);
    this.goBack();
  }
}

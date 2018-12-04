import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoutiqueService } from '../boutique.service';
import { Commerce } from '../Model/Commerce';
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
    rue: new FormControl('', Validators.required),
    numero:new FormControl('', [Validators.minLength(1), Validators.required])
  });
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService
  ) { }

  ngOnInit() {
    this.getCommerce();
  }

  preFillForm(): void {
    this.editCommerceForm.patchValue({
      nomCommerce: this.commerce.nomCommerce,
      rue: this.commerce.rue,
      numero: this.commerce.numero
    });
  }
  getCommerce(): void {
    //si nouveau commerce, va mettre 0 dans l'url, aucun commerce n'a 0 comme identifiant
    const id = +this.route.snapshot.paramMap.get('id');
    this.boutiqueService.getCommerce(id).subscribe(commerce => 
      {
        this.commerce = commerce;
        if (this.commerce != null) {
          this.preFillForm();
        }
      });
    
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
      this.boutiqueService.getCommercesObservables().subscribe(
        commerces => {
          (this.commerce.commerceId) ? this.commerce.commerceId = commerces[commerces.length].commerceId +1 :"";
          this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
          this.commerce.rue = this.editCommerceForm.get("rue").value;
          this.commerce.numero = this.editCommerceForm.get("numero").value;
        }
      );
    
    // this.commerce.nomCommerce = this.editCommerceForm.get("nomCommerce").value;
    // this.commerce.rue = this.editCommerceForm.get("rue").value;
    // this.commerce.numero = this.editCommerceForm.get("numero").value;
    if(!isNewCommerce){
      this.boutiqueService.updateCommerce(this.commerce).subscribe();
    }
    else{
      this.boutiqueService.addCommerce(this.commerce).subscribe();
    }
    this.goBack();
  }

  delete(): void{
    this.boutiqueService.deleteCommerce(this.commerce);
    this.goBack();
  }
}

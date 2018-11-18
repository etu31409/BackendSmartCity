import { Component, OnInit} from '@angular/core';
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
  commerce:Commerce;
  editerCommerceForm = new FormGroup({
    nomCommerce: new FormControl('', Validators.required),
    adresse : new FormGroup({
      rue: new FormControl('', Validators.required),
      codePostal:new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required)
    }),
  });
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService
  ) { }

  ngOnInit() {
    this.getCommerce();
    if(this.commerce != null){
      this.updateChamps();
    }
  }

  updateChamps():void{
    this.editerCommerceForm.patchValue({
      nomCommerce:this.commerce.nomCommerce,
      rue:this.commerce.adresse.rue,
      adresse:{
        rue:this.commerce.adresse.rue,
        numero:this.commerce.adresse.numero,
        codePostal:this.commerce.adresse.codePostal
      }
    });
  }
  getCommerce():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commerce = this.boutiqueService.getCommerce(id);
  }

  goBack():void{
    this.location.back();
  }

  save():void{
    this.commerce.nomCommerce = this.editerCommerceForm.get("nomCommerce").value;
    this.commerce.adresse.codePostal = this.editerCommerceForm.get("adresse").get("codePostal").value;
    this.commerce.adresse.rue = this.editerCommerceForm.get("adresse").get("rue").value;
    this.commerce.adresse.numero = this.editerCommerceForm.get("adresse").get("numero").value;
    
    this.boutiqueService.updateCommerce(this.commerce, +this.route.snapshot.paramMap.get('id'));
    this.goBack();
  }
}

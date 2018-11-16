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
  });
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boutiqueService: BoutiqueService
  ) { }

  ngOnInit() {
    this.getCommerce();
  }

  getCommerce():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commerce = this.boutiqueService.getCommerce(id);
  }

  goBack():void{
    this.location.back();
  }

  save():void{
    this.boutiqueService.updateCommerce(this.commerce);
    this.goBack();
  }
}

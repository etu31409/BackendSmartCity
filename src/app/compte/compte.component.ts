import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { BoutiqueService } from '../boutique.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
user:User;
  constructor(private boutiqueService:BoutiqueService) { }

  ngOnInit() {
    this.user = this.boutiqueService.getUser();
  }

}

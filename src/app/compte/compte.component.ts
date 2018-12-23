import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { BoutiqueService } from '../boutique.service';
import { AuthService } from '../auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  private token:string;
  constructor(private boutiqueService:BoutiqueService, private authService:AuthService) { 
    this.authService.notify().subscribe(
      token => {
        this.token = token;
      }
    );
  }

  ngOnInit() {
    
  }

}

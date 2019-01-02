import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { AuthService } from '../auth.service';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { User } from '../Model/User';
import { Constantes } from '../Constantes';
import { Utils } from '../Utils';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  private user:User;
  private roles:string;
  private token:string;
  constructor(private authService:AuthService, private boutiqueService:BoutiqueService) { 
    // this.authService.notify().subscribe(
    //   token=>{
    //     this.token = token;
    //   }
    // );
    //si on s'abonne içi, désabonne le token dans boutiqueService
  }

  ngOnInit() {
    let userId = Utils.getUserId();
    this.boutiqueService.getUser(userId).subscribe(
      user =>{
        this.user = user;
        this.roles="";
        for(let userRole of user.userRoles)
        {
          this.roles += userRole.role.name + "    ";
        }
      }
    );
  }

  

}
import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { AuthService } from '../auth.service';
import { User } from '../Model/User';
import { Utils } from '../Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  private user:User;
  private roles:string;
  private token:string;
  constructor(private authService:AuthService, private boutiqueService:BoutiqueService, private router:Router) { 
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
      },
      error => {
        Utils.errorHandler(error.status);
        this.router.navigate(['/connexion']);
      }
    );
  }

  

}

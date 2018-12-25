import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../boutique.service';
import { AuthService } from '../auth.service';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { User } from '../Model/User';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  private user:User;
  private roles:string;
  constructor(private authService:AuthService, private boutiqueService:BoutiqueService) { 
    
  }

  ngOnInit() {
    let userId = this.getUserId();
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

  getUserId(){
    let token = this.authService.getToken();
    let jwt_token = token.split('.');
    let userId = JSON.parse(atob(jwt_token[1])).uid;
    return userId;
  }

}

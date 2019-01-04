import { Constantes } from "./Constantes";
import { AuthService } from "./auth.service";

export class Utils
{
  constructor(private authService:AuthService){}
  
    static getUserId():number{
        let token = localStorage.getItem(Constantes.TOKEN_ID);
        let jwt_token = token.split('.');
        let userId = JSON.parse(atob(jwt_token[1])).uid;
        return userId;
      }

    static getUserRole():string[]{
      let token = localStorage.getItem(Constantes.TOKEN_ID);
      let jwt_token = token.split('.');
      let userRoles;
      if(atob(jwt_token[1]) != null){
        userRoles = JSON.parse(atob(jwt_token[1])).roles;
      }
      return userRoles;
    }

    static errorHandler(status:number):void{
        switch(status)
          {
            case 401 :
              alert(Constantes.SESSION_TIMED_OUT);
              break;
            case 403 :
              alert(Constantes.FORBIDDEN);
              break;
            case 500 :
              alert(Constantes.PROBLEM_API);
              break;
            case 409 :
              alert(Constantes.COMPETITOR_ACCESS)
              break;
            default: 
              alert(Constantes.UNEXPECTED_ERROR + " " + status);
          }
    }
}
import { Constantes } from "./Constantes";

export class Utils
{
    static getUserId():number{
        //this.token = this.authService.getToken();
        let token = localStorage.getItem(Constantes.TOKEN_ID);
        let jwt_token = token.split('.');
        let userId = JSON.parse(atob(jwt_token[1])).uid;
        return userId;
      }

    static errorHandler(status:number):void{
        switch(status)
          {
            case 401 :
              alert(Constantes.SESSION_TIMED_OUT);
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
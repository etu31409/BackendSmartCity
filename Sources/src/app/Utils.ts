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
}
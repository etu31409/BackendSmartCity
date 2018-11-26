import { Categorie } from "./Categorie";

export class Commerce{
    commerceId:number;
    nomCommerce:string;
    adresse:Adresse;
    //categorie:string;
    categorie:Categorie;
}

export class Adresse{
    rue:string;
    codePostal:string;
    numero:number;
}


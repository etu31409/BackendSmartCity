import { Categorie } from "./Categorie";
import { Actualite } from "./Actualite";
import { Personne } from "./Personne";
import { OpeningPeriod } from "./OpeningPeriod";

export class Commerce{
    idCommerce:number;
    nomCommerce:string;
    rue:string;
    numero:number;
    description:string;
    produitPhare:string;
    parcoursProduitPhare:string;
    numeroGSM:number;
    numeroFixe:number;
    adresseMail:string;
    urlPageFacebook:string;
    longitude:number;
    latitude:number;
    idCategorie:number;
    IdUser:number;
    rowVersion:number;
    idCategorieNavigation:Categorie;
    idUserNavigation:Personne;
    actualite:Actualite[];
    imageCommerce:ImageCommerce[];
    openingPeriod:OpeningPeriod[];
}



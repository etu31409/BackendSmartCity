import { Categorie } from "./Categorie";
import { Actualite } from "./Actualite";
import { Personne } from "./Personne";
import { OpeningPeriod } from "./OpeningPeriod";

export class Commerce{
    idCommerce:number;
    nomCommerce:string;
    rue:string;
    numero:number;
    adresseMail:string;

    description:string;
    produitPhare:string;
    parcoursProduitPhare:string;
    numeroGsm:number;
    numeroFixe:number;
    urlPageFacebook:string;
    idCategorie:number;
    idUser:number;
    rowVersion:number;
    idCategorieNavigation:Categorie;
    idUserNavigation:Personne;
    actualite:Actualite[];
    imageCommerce:ImageCommerce[];
    openingPeriod:OpeningPeriod[];
}



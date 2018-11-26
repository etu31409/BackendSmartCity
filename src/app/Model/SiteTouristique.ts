export class SiteTouristique
{
    id:number;
    nomOffice:string;
    adresse:Adresse;
    histoire:string;
    description:string;
    coordGPS:CoordGSP;
}

export class Adresse{
    rue:string;
    codePostal:string;
    numero:number;
}

export class CoordGSP{
    x:number;
    y:number;
}
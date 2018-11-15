import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connecte',
  templateUrl: './connecte.component.html',
  styleUrls: ['./connecte.component.css']
})
export class ConnecteComponent implements OnInit {
  titreCommerce:string="Mes commerces";
  commerces: any[] = [
    {
      "commerceId": 1,
      "nomCommerce": "Garden Cart",
    },
    {
      "commerceId": 2,
      "nomCommerce": "Hammer",
    },
    {
      "commerceId": 3,
      "nomCommerce": "H&M",
    },
    {
      "commerceId": 4,
      "nomCommerce": "Pizza hut",
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}

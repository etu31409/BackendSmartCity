import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnecteComponent} from './connecte/connecte.component';


const routes: Routes = [
  { path: 'connecte', component: ConnecteComponent },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
 }
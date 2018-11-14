import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnecteComponent} from './connecte/connecte.component';
import { ConnexionComponent } from './connexion/connexion.component';


const routes: Routes = [
  { path: 'connecte', component: ConnecteComponent },
  {path:'connexion', component: ConnexionComponent},
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
 }
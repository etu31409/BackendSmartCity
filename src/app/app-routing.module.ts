import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnecteComponent} from './connecte/connecte.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EditerComponent } from './editer/editer.component';
import { CompteComponent } from './compte/compte.component';
import { AideComponent } from './aide/aide.component';
import { ConnexionDetailGuard } from './connexion/connexion-detail.guard';


const routes: Routes = [
  {path: 'connecte', component: ConnecteComponent },
  {path:'connexion',
  canActivate:[ConnexionDetailGuard], component: ConnexionComponent},
  {path:'editer/:id', component: EditerComponent},
  {path:'editer', component: EditerComponent},
  {path:'aide', component: AideComponent},
  {path:'compte', component: CompteComponent},
  {path: '', redirectTo: '/connexion', pathMatch: 'full' },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
 }
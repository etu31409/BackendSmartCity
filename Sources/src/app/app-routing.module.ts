import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnecteComponent} from './connecte/connecte.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EditerComponent } from './editer/editer.component';
import { CompteComponent } from './compte/compte.component';
import { AideComponent } from './aide/aide.component';
import { ConnecteDetailGuard } from './connecte-detail.guard';
import { EditerDetailGuard } from './editer/editer-detail.guard';
import { EditHoraireComponent } from './edit-horaire/edit-horaire.component';
import { EditerActualiteComponent } from './editer-actualite/editer-actualite.component';

const routes: Routes = [
  {path: 'connecte', canActivate : [ConnecteDetailGuard], component: ConnecteComponent },
  {path:'connexion', component: ConnexionComponent},
  {path:'editer/:id', canActivate : [EditerDetailGuard], component: EditerComponent},
  {path:'editer', canActivate : [ConnecteDetailGuard], component: EditerComponent},
  {path:'aide', canActivate : [ConnecteDetailGuard], component: AideComponent},
  {path:'compte', canActivate : [ConnecteDetailGuard], component: CompteComponent},
  {path:'editer-horaire', canActivate : [ConnecteDetailGuard], component: EditHoraireComponent},
  {path:'editer-horaire/:id/:idCommerce', canActivate : [EditerDetailGuard], component: EditHoraireComponent},
  {path:'editer-actualite/:id/:idCommerce', canActivate : [EditerDetailGuard], component: EditerActualiteComponent},
  {path:'editer-actualite', canActivate : [ConnecteDetailGuard], component: EditerActualiteComponent},
  {path: '', redirectTo: '/connexion', pathMatch: 'full' },
];
//vu qu'on ne peut pas ajouter plrs gardes sur une même acolade, plrs path qui mène à la même route (comme ça plrs garde pour une route)

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
 }
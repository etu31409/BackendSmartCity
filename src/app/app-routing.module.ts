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

const routes: Routes = [
  {path: 'connecte', canActivate : [ConnecteDetailGuard], component: ConnecteComponent },
  {path:'connexion', component: ConnexionComponent},
  {path:'editer/:id', canActivate : [EditerDetailGuard], component: EditerComponent},
  {path:'editer', canActivate : [ConnecteDetailGuard], component: EditerComponent},
  {path:'aide', canActivate : [ConnecteDetailGuard], component: AideComponent},
  {path:'compte', canActivate : [ConnecteDetailGuard], component: CompteComponent},
  {path:'editer-horaire', canActivate : [ConnecteDetailGuard], component: EditHoraireComponent},
  {path:'editer-horaire/:id', canActivate : [EditerDetailGuard], component: EditHoraireComponent},
  {path: '', redirectTo: '/connexion', pathMatch: 'full' },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
 }
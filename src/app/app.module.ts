import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { ConnecteComponent } from './connecte/connecte.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { CompteComponent } from './compte/compte.component';
import { AideComponent } from './aide/aide.component';
import { EditerComponent } from './editer/editer.component';
import { ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { ActualiteComponent } from './actualite/actualite.component';
import { HoraireComponent } from './horaire/horaire.component';
import { EditHoraireComponent } from './edit-horaire/edit-horaire.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnecteComponent,
    ConnexionComponent,
    CompteComponent,
    AideComponent,
    EditerComponent,
    ActualiteComponent,
    HoraireComponent,
    EditHoraireComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

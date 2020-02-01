import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { FirestoreSettingsToken, AngularFirestore } from "@angular/fire/firestore";
import { AutoComponent } from './components/auto/auto.component';

import { ReactiveFormsModule } from '@angular/forms'
 

@NgModule({
  declarations: [
    AppComponent,
    AutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [
    AngularFirestore,
    {provide: FirestoreSettingsToken, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

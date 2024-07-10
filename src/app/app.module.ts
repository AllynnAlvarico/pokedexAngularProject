import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        MatSlideToggleModule,
        // MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

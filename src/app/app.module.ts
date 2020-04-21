import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './components/heroes/heroes.component';
import { EditorComponent } from './components/editor/editor.component';

import { OpcionesComponent } from './components/opciones/opciones.component';
import { SalidasComponent } from './components/salidas/salidas.component';

import { ArchivosService }  from './services/Archivos/archivos.service';
import { LexicoService } from './services/ListaLexico/lexico.service';
import { SintacticoService } from './services/Sintactico/sintactico.service';

import { Token } from './models/token.enum';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    EditorComponent,
    OpcionesComponent,
    SalidasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ArchivosService,
    LexicoService,
    SintacticoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

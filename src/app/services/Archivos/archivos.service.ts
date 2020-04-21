import { Injectable } from '@angular/core';

import { ArchivoModule } from '../../models/archivo/archivo.module';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  Archivos:ArchivoModule[] = []

  newArchivo:ArchivoModule = {
    Nombre:"vacio",
    Contenido:"PRUEBA INICIO"
  };
  
  constructor() { 
    this.Archivos.push( this.newArchivo);
    this.Archivos.push({Nombre:"VACÍO1", Contenido:"PRUEBA UNOS"});
    console.log(this.Archivos);
  }

  ObtenerArchivos(){
    return this.Archivos;
  }

  ObtenerLongitud():number {
    return this.Archivos.length;
  }

  Agregar(nombre:string, contenido:string){
    //this.Archivos.push(new ArchivoModule(nombre,contenido));
  }

  VerArchivo(index:number){
    return this.Archivos[index];
  }
}

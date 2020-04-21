import { Component, OnInit } from '@angular/core';

import { ArchivoModule } from '../../models/archivo/archivo.module';

import { ArchivosService } from '../../services/Archivos/archivos.service';
import { LexicoService } from '../../services/ListaLexico/lexico.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  selector:ArchivoModule[] = [];
  public filestring:any = "ESTE TEXTAREA ES SOLO PARA LEER ARCHIVOS , NO MODIFICAR"; 
  file:any; 
  unlocown:any;

  newArchivo:ArchivoModule={
    Nombre:"Nuevo "+  this.archivos.ObtenerLongitud(),
    Contenido:""
  };

  nombre:String;

  constructor(private archivos:ArchivosService, private Lexico:LexicoService) {
    this.selector = archivos.ObtenerArchivos();
   }

   fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument();
  }
  uploadDocument(){
  let fileReader = new FileReader(); 
  fileReader.onload = (e) =>{
    //console.log(fileReader.result);
    this.selector.push({
      Nombre: this.file.name,
      Contenido: fileReader.result.toString()
    });
    
    this.filestring = fileReader.result;
  }
  fileReader.readAsText(this.file);
  }

  ngOnInit(): void {
  }

  ObtenerArchivos(){
    var Contenido=document.getElementById("editor").textContent;
    //console.log(Contenido);
    this.Lexico.Separar(Contenido);
    
  }

  AgregarNuevo(){
    this.selector.push(this.newArchivo);
    this.newArchivo={
      Nombre:"Nuevo "+  this.archivos.ObtenerLongitud(),
      Contenido:""
    }
  }

}

import { Component, OnInit } from '@angular/core';

import { ArchivosService } from '../../services/Archivos/archivos.service';
import { ArchivoModule } from '../../models/archivo/archivo.module';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  selector:any[];
  
  contenido:string ;
  indice:number;


  public newArchivo:ArchivoModule = {
    Nombre : "",
    Contenido: ""
  };

  constructor(private archivos:ArchivosService) {
    this.selector = archivos.ObtenerArchivos();
    this.indice=0;
    this.newArchivo =  archivos.ObtenerArchivos()[this.indice];
   }

  ngOnInit(): void {
  }
  
  VerContenido(){
    //alert("MENSAJE");
    this.newArchivo = this.selector[this.indice];
    //console.log(this.newArchivo);
  }

}

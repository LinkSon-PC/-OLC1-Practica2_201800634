import { Component, OnInit } from '@angular/core';
import { LexicoService } from '../../services/ListaLexico/lexico.service';

import { ListaModule, LexicoModule } from '../../models/lexico/lexico.module';
import { SintacticoModule,ListaSintactico } from "../../models/sintactico/sintactico.module";

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  Traduccion:string;

  _Tlexico:boolean = false;
  _TSintactico:boolean = false ;

  ErrLexico:LexicoModule[] =[];
  ErrSintactico:ListaSintactico[] =[];

  errorLexico:ListaModule;
  errorSintactico:SintacticoModule;

  constructor(private Sintactico:LexicoService) { 
    this.Traduccion = this.Sintactico.Traduccion;   
  }

  ngOnInit(): void {
  }

  verLexico(){
    if(this._Tlexico){ 
      this.ErrLexico = this.Sintactico.ErrorLexico;
    }else{
      this.ErrLexico = [];
    }
  }

  verSintactico(){
    if(this._TSintactico){ 
      this.ErrSintactico =  this.Sintactico.ErrorSintactico;
    }else{
      this.ErrSintactico = [];
    }
  }

}

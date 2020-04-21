import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LexicoModule {
  Lexema:string;
  Fila:Number;
  Columna:Number;
  Tipo:Token;
  Descripcion:string;
  Error:string;
 }

 export enum Token {
  sb_mas,
  sb_menos,
  sb_por,
  sb_division,
  sb_and,
  sb_or,
  sb_not,
  sb_comparacion,

  parentesis_izq,
  parentesis_derecho,
  llave_izq,
  llave_derecha,
  corchete_derecho,
  corchete_izquierdo,

  caracter,   //  ' '
  decimales,      // 0.0000
  comentarioLinea,    //  
  comentarioBloques,  //
  numero,
  cadena,
  igual,
  mayor_que,
  menor_que,

  dosPuntos,
  punto_y_coma,
  igualComparacion,
  diferente,
  mayor_o_igual,
  menor_o_igual,
  incremento,
  decremento,
  coma,
  punto,
  sharp, // FINALIZA 

  id,
  P_Int,//  comienzan palabras reservadas
  P_Float,
  P_Char,
  P_String,
  P_while,//
  P_Bool,
  P_Class,
  P_static,
  P_void,
  P_Main,
  P_false,
  P_true,
  P_if,
  P_else,
  P_switch,
  P_case,
  P_break,
  P_default,
  P_new,
  P_graficarVector,
  P_Console,
  P_WriteLine,
  P_for,
  P_Return,
  P_Continue,
  P_Double,
  P_Do,

  Desconocido
}

export class ListaModule {
  Error:LexicoModule[] = [];
  Correcto:LexicoModule[] = [];

  Elemento:LexicoModule ={
    Lexema:"",
    Fila:0,
    Columna:0,
    Tipo:Token.sharp,
    Descripcion:"",
    Error:"LEXICO"
  };

  constructor() {
   }

  AgregarError(Lexema:string, Fila:number, Columna:number, Tipo:Token){
    this.Elemento = {Lexema:Lexema, Fila:Fila, Columna:Columna, Tipo:Tipo, Descripcion:this.getTipo(Tipo), Error: "LEXICO"};
    this.Error.push(this.Elemento);
  }

  AgregarCorrecto(Lexema:string, Fila:number, Columna:number, Tipo:Token){
    this.Elemento = {Lexema:Lexema, Fila:Fila, Columna:Columna,Tipo:Tipo, Descripcion:this.getTipo(Tipo), Error: ""};
    this.Correcto.push(this.Elemento);
  }

  ListaError():LexicoModule[] {
    return this.Error;
  }

  
  ListaCorrecto():LexicoModule[] {
    return this.Correcto;
  }

  getTipo(Tipo_token: Token): string {
    switch (Tipo_token) {
      case Token.sb_mas:
        return "mas";
      case Token.sb_menos:
        return "menos";
      case Token.sb_por:
        return "Por";
      case Token.sb_division:
        return "division";
      case Token.sb_comparacion:
        return "==";
      case Token.sb_and:
        return "&&";
      case Token.sb_or:
        return "||";
      case Token.sb_not:
        return "!";

      case Token.parentesis_izq:
        return "Parentesis_izquierdo";
      case Token.parentesis_derecho:
        return "Parentesis Derecho";
      case Token.llave_izq:
        return "LLave_izquierda";
      case Token.llave_derecha:
        return "llave_Derecha";
      case Token.corchete_izquierdo:
        return "Corchete izquierdo ";
      case Token.corchete_derecho:
        return "Corchete Derecho";

      case Token.caracter:
        return "caracter";
      case Token.decimales:
        return "Numero Decimal";
      case Token.comentarioLinea:
        return "ComentarioLineal";
      case Token.comentarioBloques:
        return "ComentarioBloque";
      case Token.numero:
        return "Numero_Entero";
      case Token.cadena:
        return "cadena";
      case Token.igual:
        return "Signo_Igual";
      case Token.mayor_que:
        return "MayorQue";
      case Token.menor_que:
        return "MenorQue";
      case Token.dosPuntos:
        return "Dos_puntos";
      case Token.punto_y_coma:
        return "Punto_y_coma";

      case Token.igualComparacion:
        return "igual comparacion";
      case Token.diferente:
        return "diferente de";
      case Token.mayor_o_igual:
        return "mayor o igual ";
      case Token.menor_o_igual:
        return "menor o igual ";
      case Token.incremento:
        return "incremento ";
      case Token.decremento:
        return "decremento ";
      case Token.coma:
        return "coma ";
      case Token.punto:
        return "punto";

      case Token.id:
        return "ID ";
      case Token.sharp:
        return "FINALIZACION";
      case Token.P_Int:
        return "Palabra Reservada Int";
      case Token.P_Float:
        return "Palabra Reservada Float";
      case Token.P_Char:
        return "Palabra Reservada Char";
      case Token.P_String:
        return "Palabra Reservada String";
      case Token.P_while:
        return "Palabra Reservada Int";
      case Token.P_Bool:
        return "Palabra Reservada Bool";
      case Token.P_Class:
        return "Palabra Reservada Class";
      case Token.P_static:
        return "Palabra Reservada static";
      case Token.P_void:
        return "Palabra Reservada void";
      case Token.P_Main:
        return "Palabra Reservada Main";
      case Token.P_false:
        return "Palabra Reservada false";
      case Token.P_true:
        return "Palabra Reservada true";
      case Token.P_if:
        return "Palabra Reservada if";
      case Token.P_else:
        return "Palabra Reservada else";
      case Token.P_switch:
        return "Palabra Reservada switch";
      case Token.P_case:
        return "Palabra Reservada case";
      case Token.P_break:
        return "Palabra Reservada break";
      case Token.P_default:
        return "Palabra Reservada default";
      case Token.P_new:
        return "Palabra Reservada new";
      case Token.P_graficarVector:
        return "Palabra Reservada graficarVector";

      case Token.P_Console:
        return "Objeto Console";
      case Token.P_WriteLine:
        return "Propiedad WriteLine";
      case Token.P_for:
        return "For";

      case Token.P_Return:
        return "return";
      case Token.P_Continue:
        return "continue";

      case Token.P_Double:
        return "Double";

      case Token.P_Do:
        return "Do";

      case Token.Desconocido:
        return "Desconocido";

      default:
        return "NO REGISTRADO"; // ME AVISA SI HAY UNO QUE ME FALTO REGISTRAR EN MI CLASE ENUM
    }
  }
}
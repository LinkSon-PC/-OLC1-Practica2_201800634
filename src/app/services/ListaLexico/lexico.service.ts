import { Injectable } from "@angular/core";


import { isIdentifier } from "@angular/compiler";
import { isNumber } from "util";

import { LexicoModule, Token, ListaModule } from '../../models/lexico/lexico.module'
import { SintacticoModule,ListaSintactico } from '../../models/sintactico/sintactico.module';

@Injectable({
  providedIn: "root",
})
export class LexicoService {
  texto: string[] = [];
  fila: number = 0;
  columna: number = 0;

  Listas:ListaModule;
  Sintactico:SintacticoModule;
  Traduccion:string;

  ErrorLexico:LexicoModule[] = [];
  ErrorSintactico:ListaSintactico[] = [];

  constructor() {
    this.Traduccion="";
    this.Listas= new ListaModule();

    this.Sintactico=new SintacticoModule();

    this.fila = 0;
    this.fila = 0;
  }

  Separar(_Contenido: string) {
    this.Traduccion="";
    this.Listas= new ListaModule();
    this.ErrorLexico = this.Listas.ListaError();

    this.Sintactico=new SintacticoModule();
    this.fila = 0;
    this.fila = 0;
    this.texto = _Contenido.split("\n");
    //console.log(this.texto);

    var a = "_";
    console.log(isIdentifier(a) + "  " + isNumber(a) + "  " + a.charCodeAt(0));

    var i = 0;
    var _estado = 0;
    var lexema = "";

    _estado=this.Estado(_Contenido.charAt(0));

    while (i < _Contenido.length) {
      var char = _Contenido.charAt(i);


      if(_estado==0){
      _estado = this.Estado(char);}

      switch (_estado) {
        case 0:
          break;

        case 1:
          lexema += char;
          _estado = 2;
          break;
        case 2:
          if (char === "+") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.incremento
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_mas
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 3:
          lexema += char;
          _estado = 4;
          break;
        case 4:
          if (char === "-") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.decremento
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_menos
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 5:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.sb_por
          );
          lexema = "";
          _estado = 0;
          break;

        case 6:
          lexema += char;
          _estado = 7;
          break;
        case 7:
          if (char === "/") {
            lexema += char;
            _estado = 8;
          }
          else if (char === "*") {
            lexema += char;
            _estado = 9;
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_division
            );
            lexema = "";
            _estado = 0;
            i--;
          }
          break;
        case 8:
          lexema += char;
          if (char === "\n") {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.comentarioLinea
            );
            lexema = "";
            _estado = 0;
            this.fila++;
            this.columna =0;
          }
          break;
        case 9:
          lexema += char;
          if (char === "*") {
            _estado = 10;
          }
          if(char === "\n"){this.fila++; this.columna=0;}
          break;
        case 10:
          lexema += char;
          if (char === "/") {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.comentarioBloques
            );
            lexema = "";
            _estado = 0;
          } else {
            _estado = 9;
            if(char === "\n"){this.fila++; this.columna=0;}
          }
          break;

        case 11:
          lexema += char;
          _estado = 12;
          break;
        case 12:
          if (char === "=") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_comparacion
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.igual
            );
            i--;
          }
            lexema = "";
            _estado = 0;
          break;

        case 13:
          lexema += char;
          _estado = 14;
          break;
        case 14:
          if (char === "&") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_and
            );
          } else {
            this.Listas.AgregarError(
              lexema,
              this.fila,
              this.columna,
              Token.Desconocido
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 15:
          lexema += char;
          _estado = 16;
          break;
        case 16:
          if (char === "|") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_or
            );
          } else {
            this.Listas.AgregarError(
              lexema,
              this.fila,
              this.columna,
              Token.Desconocido
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 17:
          lexema += char;
          _estado = 18;
          break;
        case 18:
          if (char === "=") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.diferente
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.sb_not
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 19:
          lexema += char;
          _estado = 20;
          break;
        case 20:
          if (char === "=") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.mayor_o_igual
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.mayor_que
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 21:
          lexema += char;
          _estado = 22;
          break;
        case 22:
          if (char === "=") {
            lexema += char;
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.menor_o_igual
            );
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.menor_que
            );
            i--;
          }
          lexema = "";
          _estado = 0;
          break;

        case 23:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.punto
          );
          lexema = "";
          _estado = 0;
          break;

        case 24:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.dosPuntos
          );
          lexema = "";
          _estado = 0;
          break;

        case 25:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.coma
          );
          lexema = "";
          _estado = 0;
          break;

        case 26:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.punto_y_coma
          );
          lexema = "";
          _estado = 0;
          break;

        case 27:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.parentesis_izq
          );
          lexema = "";
          _estado = 0;
          break;

        case 28:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.parentesis_derecho
          );
          lexema = "";
          _estado = 0;
          break;

        case 29:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.llave_izq
          );
          lexema = "";
          _estado = 0;
          break;

        case 30:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.llave_derecha
          );
          lexema = "";
          _estado = 0;
          break;

        case 31:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.corchete_izquierdo
          );
          lexema = "";
          _estado = 0;
          break;

        case 32:
          lexema += char;
          this.Listas.AgregarCorrecto(
            lexema,
            this.fila,
            this.columna,
            Token.corchete_derecho
          );
          lexema = "";
          _estado = 0;
          break;

        case 33:
          lexema += char;
          _estado = 34;
          break;
        case 34:
          lexema += char;
          if (char === '"') {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.cadena
            );
            lexema = "";
            _estado = 0;
          }
          break;

        case 35:
          lexema += char;
          _estado = 36;
          break;
        case 36:
          lexema += char;
          if (char === "'") {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.caracter
            );
            lexema = "";
            _estado = 0;
          }
          break;

        case 37:
          lexema += char;
          _estado = 38;
          break;
        case 38:
          if ( (char.toLowerCase().charCodeAt(0)>= 97 && char.toLowerCase().charCodeAt(0) <= 122) || ( char.charCodeAt(0)>= 48 && char.charCodeAt(0) <= 57 ) || char === "_") {
            lexema += char;
          } else {
            if (lexema === "int") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Int
              );
            } else if (lexema === "if") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_if
              );
            } else if (lexema === "else") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_else
              );
            } else if (lexema === "double") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Double
              );
            } else if (lexema === "char") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Char
              );
            } else if (lexema === "case") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_case
              );
            } else if (lexema === "continue") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Continue
              );
            } else if (lexema === "class") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Class
              );
            } else if (lexema === "bool") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Bool
              );
            } else if (lexema === "string") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_String
              );
            } else if (lexema === "switch") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_switch
              );
            } else if (lexema === "void") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_void
              );
            } else if (lexema === "Console") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Console
              );
            } else if (lexema === "Write") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_WriteLine
              );
            } else if (lexema === "default") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_default
              );
            } else if (lexema === "break") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_break
              );
            } else if (lexema === "for") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_for
              );
            } else if (lexema === "while") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_while
              );
            } else if (lexema === "do") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Do
              );
            } else if (lexema === "return") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Return
              );
            } else if (lexema === "main") {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.P_Main
              );
            } else {
              this.Listas.AgregarCorrecto(
                lexema,
                this.fila,
                this.columna,
                Token.id
              );
            }
            i--;
            _estado = 0;
            lexema = "";
          }
          break;

        case 39:
          if ( char.charCodeAt(0)>= 48 && char.charCodeAt(0) <= 57 ) {
            lexema += char;
          } else if (char === ".") {
            lexema += char;
            _estado = 40;
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.numero
            );
            lexema = "";
            _estado = 0;
            i--;
          }
          break;
        case 40:
          if ( char.charCodeAt(0)>= 48 && char.charCodeAt(0) <= 57 ) {
            lexema += char;
          } else {
            this.Listas.AgregarCorrecto(
              lexema,
              this.fila,
              this.columna,
              Token.decimales
            );
            lexema = "";
            _estado = 0;
            i--;
          }
          break;

          case 100:
            this.Listas.AgregarError(char,this.fila,this.columna,Token.Desconocido);
            _estado=0;
            break;

        default:
          break;
      }

      i++;
    }
    
    this.Listas.AgregarCorrecto("#",this.fila+1,this.columna,Token.sharp);

    //console.log(this.Listas.ListaCorrecto());
    
    console.log(this.Listas.ListaError());

    this.Sintactico.parsear(this.Listas.ListaCorrecto());

    this.Traduccion = this.Sintactico.GetTraduccion();
    console.log(this.Sintactico.GetErrorSintactico());

    
    var Contenido=document.getElementById("salida");
    Contenido.innerText = this.Traduccion;
    
    this.ErrorSintactico = this.Sintactico.GetErrorSintactico();
  }


  public getTraduccion():string{
    console.log(this.Traduccion);
    return this.Traduccion;
  }

  Estado(caracter: string): number {
    var char = caracter.charCodeAt(0);

    if (char >= 0 && char <= 32) {
      if (char == 10) {
        this.fila++;
        this.columna =0;
      } else if (char == 32 || char == 9) {
        this.columna++;
      }
      return 0;
    } else if (caracter === "+") {
      return 1;
    } else if (caracter === "-") {
      return 3;
    } else if (caracter === "*") {
      return 5;
    } else if (caracter === "/") {
      return 6;
    } else if (caracter === "=") {
      return 11;
    } else if (caracter === "&") {
      return 13;
    } else if (caracter === "|") {
      return 15;
    } else if (caracter === "!") {
      return 17;
    } else if (caracter === ">") {
      return 19;
    } else if (caracter === "<") {
      return 21;
    } else if (caracter === ".") {
      return 23;
    } else if (caracter === ":") {
      return 24;
    } else if (caracter === ",") {
      return 25;
    } else if (caracter === ";") {
      return 26;
    } else if (caracter === "(") {
      return 27;
    } else if (caracter === ")") {
      return 28;
    } else if (caracter === "{") {
      return 29;
    } else if (caracter === "}") {
      return 30;
    } else if (caracter === "[") {
      return 31;
    } else if (caracter === "]") {
      return 32;
    } else if (caracter === '\"') {
      return 33;
    } else if (caracter === "\'") {
      return 35;
    } else if ( caracter.toLowerCase().charCodeAt(0)>= 97 && caracter.toLowerCase().charCodeAt(0) <= 122 ) {
      return 37;  //CARACTERES  ASCII
    } else if (char >= 48 && char <= 57) {
      return 39;  //NUMEROS ASCII
    }
    return 100;
  }
}

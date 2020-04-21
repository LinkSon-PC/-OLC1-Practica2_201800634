import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListaModule, Token, LexicoModule } from "../lexico/lexico.module";
import { HtmlModule,ObjetoHtml } from '../../models/hjson/html.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ListaSintactico {
  No: number;
  TipoE: string;
  Fila: Number;
  Columna: Number;
  Descripcion: string;
}

export class SintacticoModule {
  LS_Error: ListaSintactico[];
  objeto: ListaSintactico = {
    No: 0,
    Columna: 0,
    Fila: 0,
    Descripcion: "",
    TipoE: "SINTÁCTICO",
  };

  Lexico: LexicoModule[]=[];

  Traduccion: string;

  Continuar: boolean;
  NLlagves: boolean;
  NSalto: boolean;
  Tabulador: number;

  Traducir: boolean;

  OpReturn: boolean;
  OpFuncion: boolean;
  OpSwitch: Boolean;

  TokenActual: LexicoModule;
  Actual: number;

  PR_break:boolean;
  HTML:string;

  HtmlJson:HtmlModule;
  public RepHJ:ObjetoHtml;

  constructor() {
    this.OpReturn = false;
    this.OpFuncion = false;
    this.OpSwitch = false;

    //this.LS_Error = [];
    this.Traduccion = "";
    this.Continuar = false;
    this.NLlagves = false;

    this.Traducir = true;

    this.Tabulador = 0;
    this.Actual = 0;

    this.HTML = "";
  }

  public GetTraduccion(): string {
    //console.log(this.Traduccion);
    return this.Traduccion;
  }

  public GetErrorSintactico(): any[] {
    return this.LS_Error;
  }

  parsear(_lexico: LexicoModule[]): void {this.OpReturn = false;
    this.OpFuncion = false;
    this.OpSwitch = false;

    this.LS_Error = [];
    this.Traduccion = "";
    this.Continuar = false;
    this.NLlagves = false;

    this.Traducir = true;

    this.Tabulador = 0;
    this.Actual = 0;

    
    this.HTML = "";
    this.PR_break = false;

    this.Lexico = _lexico;

    console.log("ANÁLISIS SINTÁCTICO");
    console.log(this.Lexico);

    this.LS_Error = [];
    this.TokenActual = this.Lexico[this.Actual];

    this.Inicio();

    this.traduce();

    console.log(this.HTML);

    this.HtmlJson = new HtmlModule(this.HTML);
    this.RepHJ = this.HtmlJson.getReporte();
  }

  Inicio(): void {
    this.Declara_Clase();
    this.Lista_Clases();
    this.parea(Token.sharp);
  }

  Declara_Clase(): void {
    this.parea(Token.P_Class);
    this.parea(Token.id);
    this.Traduccion += "\n";
    this.Instruccion_Llaves();
  }
  Lista_Clases(): void {
    if (this.TokenActual.Tipo == Token.P_Class) {
      this.Declara_Clase();
      this.Lista_Clases();
    } else {
      //EPSILON
    }
  }

  Instruccion_Llaves(): void {
    this.Continuar = false;
    this.parea(Token.llave_izq);
    this.Tabulador++;

    this.Continuar = true;

    //this.Traducir = true;
    this.salto();
    this.List_Intrucciones();

    this.Tabulador--;

    this.Continuar = false;
    this.parea(Token.llave_derecha);
    this.salto();
    this.Continuar = true;
  }

  List_Intrucciones(): void {
    this.Instruccion();
    this.InstruccionP();
  }

  Instruccion(): void {
    this.ignoraComentarios();
    this.tab();

    // TODAS LAS SENTENCIAS QUE PUEDO HACER....  primeros de cada sentencia
    if (this.TokenActual.Tipo == Token.P_if) {
      // Instruccion -> Sentencia_if
      this.sentencia_if();
    } else if (this.TokenActual.Tipo == Token.P_while) {
      // Instruccion -> sentencia_while
      this.sentencia_while();
    } else if (this.TokenActual.Tipo == Token.P_Do) {
      // Instruccion -> sentencia_while
      this.sentencia_dowhile();
    } else if (this.TokenActual.Tipo == Token.P_for) {
      // Instruccion -> sentencia_for
      this.sentencia_for();
    } else if (this.TokenActual.Tipo == Token.P_Console) {
      // Instruccion -> sentenciaImprime
      this.SentenciaImprime();
    } else if (this.TokenActual.Tipo == Token.P_switch) {
      // Instruccion -> switch
      this.SentenciaSwitch_case();
    } else if (
      this.TokenActual.Tipo == Token.P_Int ||
      this.TokenActual.Tipo == Token.P_Float ||
      this.TokenActual.Tipo == Token.P_Char ||
      this.TokenActual.Tipo == Token.P_String ||
      this.TokenActual.Tipo == Token.P_Double ||
      this.TokenActual.Tipo == Token.P_Bool ||
      this.TokenActual.Tipo == Token.P_void
    ) {
      this.Declaracion();
    } else if (this.TokenActual.Tipo == Token.id) {
      // Instruccion -> asignacionSimple
      this.AsignacionSimple();
    } else if (this.TokenActual.Tipo == Token.P_Return) {
      // Instruccion -> asignacionSimple
      this.SentenciaReturn();
    } else if (this.TokenActual.Tipo == Token.P_Continue) {
      // Instruccion -> asignacionSimple
      this.SentenciaContinue();
    } else if (this.TokenActual.Tipo == Token.P_break) {
      // Instruccion -> asignacionSimple
      this.SentenciaBreak();
    } else {
    }
  }

  InstruccionP(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.P_if) {
      // significa que viene otra instruccion entonces me vuelvo a llamar
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_while) {
      // Instruccion -> sentencia_while
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_for) {
      // Instruccion -> sentencia_for
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_Console) {
      // Instruccion -> sentenciaImprime
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_switch) {
      // Instruccion -> switch
      this.Instruccion();
      this.InstruccionP();
    } else if (
      this.TokenActual.Tipo == Token.P_Int ||
      this.TokenActual.Tipo == Token.P_Float ||
      this.TokenActual.Tipo == Token.P_Char ||
      this.TokenActual.Tipo == Token.P_String ||
      this.TokenActual.Tipo == Token.P_Double ||
      this.TokenActual.Tipo == Token.P_Bool ||
      this.TokenActual.Tipo == Token.P_void
    ) {
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.id) {
      // Instruccion -> asignacionSimple
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_Return) {
      // Instruccion -> asignacionSimple
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_Continue) {
      // Instruccion -> asignacionSimple
      this.Instruccion();
      this.InstruccionP();
    } else if (this.TokenActual.Tipo == Token.P_break && this.PR_break == true) {
      // Instruccion -> asignacionSimple
      this.Instruccion();
      this.PR_break = false;

    } else if ( (this.TokenActual.Tipo == Token.punto_y_coma) && this.Traducir == false) {
    this.Traducir = true;
    
      this.Actual++;
      this.TokenActual = this.Lexico[this.Actual];
      
    this.Instruccion();
    this.InstruccionP();

  } else if ( (this.TokenActual.Tipo != Token.llave_derecha && this.TokenActual.Tipo != Token.sharp) ) {
    this.Traducir = true;
    
    this.LS_Error.push({
      No: this.LS_Error.length,
      Fila: this.TokenActual.Fila,
      Columna: this.TokenActual.Columna,
      Descripcion:
        "INSTRUCCION NO VÁLIDA " + this.getTipo_Error(this.TokenActual.Tipo),
      TipoE: "SINTÁCTICO",
    });

      this.Actual++;
      this.TokenActual = this.Lexico[this.Actual];
      
    this.Instruccion();
    this.InstruccionP();
      
  } else {
    this.Traducir =true;
      // epsilon -----
      
    }
  }

  Declaracion(): void {
    if (this.TokenActual.Tipo == Token.P_void) {
      this.parea(Token.P_void);

      if (
        this.getTipo_Error(this.TokenActual.Tipo) ===
        this.getTipo_Error(Token.P_Main)
      ) {
        this.Traduccion += "if __name__ = \"__main__\"\: main()";
        this.Traduccion += "def" ;
        this.parea(Token.P_Main);
        
      } else {
        this.parea(Token.id);
      }

      this.parea(Token.parentesis_izq);
      this.OpcionMain_Metodo();
      
    } else {
      this.Tipo();
      this.parea(Token.id);
      this.DeclaracionP();
    }
  }

  DeclaracionP() {
    if (this.TokenActual.Tipo == Token.parentesis_izq) {
      this.parea(Token.parentesis_izq);
      this.OpcionMain_Metodo();
    } else {
      this.Lista_ID();
      this.Asignacion();
      this.parea(Token.punto_y_coma);
    }
  }

  Lista_ID() {
    if (this.TokenActual.Tipo == Token.coma) {
      this.parea(Token.coma);
      this.parea(Token.id);
      this.Lista_ID();
    } else {
      //EPSILON
    }
  }
  Asignacion() {
    if (this.TokenActual.Tipo == Token.igual) {
      this.parea(Token.igual);
      this.Expresion();
    } else {
      //EPSILON
    }
  }

  OpcionMain_Metodo(): void {
    if (this.TokenActual.Tipo == Token.parentesis_derecho) {
      this.parea(Token.parentesis_derecho);
    } else {
      this.Tipo();
      this.parea(Token.id);
      this.ListaParametros();
      this.parea(Token.parentesis_derecho);
    }
    this.Instruccion_Llaves();
  }
  ListaParametros(): void {
    if (this.TokenActual.Tipo == Token.coma) {
      this.parea(Token.coma);
      this.Tipo();
      this.parea(Token.id);
      this.ListaParametros();
    } else {
      //EPSILON
    }
  }

  SentenciaReturn() {
    this.parea(Token.P_Return);

    if (this.TokenActual.Tipo != Token.punto_y_coma) {
      this.Lista_Condicionales();
    }
    this.parea(Token.punto_y_coma);
  }
  SentenciaReturnMetodo() {
    this.parea(Token.P_Return);
    this.parea(Token.punto_y_coma);
  }
  SentenciaBreak() {
    this.parea(Token.P_break);
    this.parea(Token.punto_y_coma);
  }
  SentenciaContinue() {
    this.parea(Token.P_Continue);
    this.parea(Token.punto_y_coma);
  }

  AsignacionSimple() {
    this.parea(Token.id);
    this.OpcionAsignacion();
  }
  OpcionAsignacion() {
    if (this.TokenActual.Tipo == Token.igual) {
      this.parea(Token.igual);
      this.Expresion();
    } else {
      this.parea(Token.parentesis_izq);
      this.LLamada_Metodo();
    }
    this.parea(Token.punto_y_coma);
  }
  LLamada_Metodo() {
    if (this.TokenActual.Tipo == Token.parentesis_derecho) {
      this.parea(Token.parentesis_derecho);
    } else {
      this.List_Expresiones();
      this.parea(Token.parentesis_derecho);
    }
  }
  List_Expresiones() {
    this.Expresion();
    this.List_ExpresionesP();
  }
  List_ExpresionesP() {
    if (this.TokenActual.Tipo == Token.coma) {
      this.parea(Token.coma);
      this.Expresion();
      this.List_ExpresionesP();
    } else {
      //EPSILON
    }
  }

  public Expresion() {
    this.E();
    this.simboloComparacionOpcional();
  }

  public simboloComparacionOpcional(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.igualComparacion) {
      // simboloComparacionOpcional  -> == E
      this.parea(Token.igualComparacion);
      this.E();
    } else if (this.TokenActual.Tipo == Token.mayor_que) {
      // simboloComparacionOpcional  -> > E
      this.parea(Token.mayor_que);
      this.E();
    } else if (this.TokenActual.Tipo == Token.menor_que) {
      this.parea(Token.menor_que);
      this.E();
    } else if (this.TokenActual.Tipo == Token.menor_o_igual) {
      this.parea(Token.menor_o_igual);
      this.E();
    } else if (this.TokenActual.Tipo == Token.mayor_o_igual) {
      // simboloComparacionOpcional  ->   >= E
      this.parea(Token.mayor_o_igual);
      this.E();
    } else if (this.TokenActual.Tipo == Token.diferente) {
      // simboloComparacionOpcional  ->   != E
      this.parea(Token.diferente);
      this.E();
    } else {
      // simboloComparacionOpcional  -> -EPSILON
    }
  }

  public E(): void {
    //E-> T EP
    this.ignoraComentarios();
    this.T();
    this.EP(); // E PRIMA
  }
  public EP(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.sb_mas) {
      //EP-> + T EP
      this.parea(Token.sb_mas);
      this.T();
      this.EP();
    } else if (this.TokenActual.Tipo == Token.sb_menos) {
      //EP-> - T EP
      this.parea(Token.sb_menos);
      this.T();
      this.EP();
    } else {
      // EP-> EPSILON
    }
  }
  public T(): void {
    // T->F TP  = T-> FT'
    this.ignoraComentarios();
    this.F();
    this.TP();
  }
  public TP(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.sb_por) {
      // TP-> * F TP
      this.parea(Token.sb_por);
      this.F();
      this.TP();
    } else if (this.TokenActual.Tipo == Token.sb_division) {
      // TP-> / F TP
      this.parea(Token.sb_division);
      this.F();
      this.TP();
    } else {
      // TP-> EPSILON
    }
  }
  public F(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.parentesis_izq) {
      //F->  (E)
      this.parea(Token.parentesis_izq);
      this.E();
      this.parea(Token.parentesis_derecho);
    } else if (this.TokenActual.Tipo == Token.decimales) {
      //F->  NUMERO
      this.parea(Token.decimales);
    } else if (this.TokenActual.Tipo == Token.cadena) {
      //F->  CADENA
      this.parea(Token.cadena);
    } else if (this.TokenActual.Tipo == Token.id) {
      //F->  id
      this.parea(Token.id); // me da duda....
      this.metodoExpresion();
    } else if (this.TokenActual.Tipo == Token.P_true) {
      //F->  TRUE
      this.parea(Token.P_true);
    } else if (this.TokenActual.Tipo == Token.P_false) {
      //F->  FALSE
      this.parea(Token.P_false);
    } else if (this.TokenActual.Tipo == Token.caracter) {
      this.HTML +=  this.TokenActual.Lexema.substring(1,this.TokenActual.Lexema.length-1);
      this.parea(Token.caracter);
    } else {
      //F->  NUMERO
      this.parea(Token.numero);
    }
  }

  public sentencia_if(): void {
    
    this.parea(Token.P_if);
    
    this.Continuar = false;
    this.parea(Token.parentesis_izq);
    this.Continuar = true;

    this.Lista_Condicionales();

    this.Continuar = false;
    this.parea(Token.parentesis_derecho);
    this.Continuar = true;
    this.Traduccion += ":";

    this.Instruccion_Llaves();

    this.else();
  }
  public else(): void {
    this.tab();
    this.ignoraComentarios();

    if (this.TokenActual.Tipo == Token.P_else) {
      this.parea(Token.P_else);

      if (
        this.getTipo_Error(this.TokenActual.Tipo) ===
        this.getTipo_Error(Token.P_if)
      ) {

        this.sentencia_ifP();

      } else {
        this.Traduccion += ":";
    
        this.Instruccion_Llaves();
      }

      this.else();

    } else {
      //EPSILON    NO HAY ELSE
      
      this.Traduccion += "\n";
    }
  }
  public sentencia_ifP(): void {
    
    this.parea(Token.P_if);
    
    this.Continuar = false;
    this.parea(Token.parentesis_izq);
    this.Continuar = true;

    this.Lista_Condicionales();

    this.Continuar = false;
    this.parea(Token.parentesis_derecho);
    this.Continuar = true;
    this.Traduccion += ":";

    this.Instruccion_Llaves();
  }

  public Lista_Condicionales(): void {
    this.Expresion();
    this.Lista_CondicionalesP();
  }
  Lista_CondicionalesP() {
    if (this.TokenActual.Tipo == Token.sb_and) {
      this.parea(Token.sb_and);
      this.Expresion();
      this.Lista_CondicionalesP();
    } else if (this.TokenActual.Tipo == Token.sb_or) {
      this.parea(Token.sb_or);
      this.Expresion();
      this.Lista_CondicionalesP();
    } else if (this.TokenActual.Tipo == Token.sb_comparacion) {
      this.parea(Token.sb_comparacion);
      this.Expresion();
      this.Lista_CondicionalesP();
    } else {
      //EPSILON
    }
  }

  public sentencia_while(): void {
    
    this.parea(Token.P_while);
    this.parea(Token.parentesis_izq);
    this.Lista_Condicionales();
    this.parea(Token.parentesis_derecho);

    this.Instruccion_Llaves();
  }

  public sentencia_dowhile(): void {
    this.tab();
    this.parea(Token.P_Do);

    this.Instruccion_Llaves();

    this.parea(Token.P_while);
    this.parea(Token.parentesis_izq);
    this.Lista_Condicionales();
    this.parea(Token.parentesis_derecho);
  }

  public sentencia_for(): void {
    this.tab();

    this.parea(Token.P_for);
    this.parea(Token.parentesis_izq);
    this.declaracionFOR();
    this.NSalto = true;
    this.parea(Token.punto_y_coma);

    this.Expresion();

    this.NSalto = true;
    this.parea(Token.punto_y_coma);
    this.parea(Token.id);
    this.DecrementoIncremento();
    this.parea(Token.parentesis_derecho); //   )

    this.Instruccion_Llaves();
  }

  public DecrementoIncremento(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.incremento) {
      this.parea(Token.incremento);
    } else {
      this.parea(Token.decremento);
    }
  }
  public declaracionFOR(): void {
    this.ignoraComentarios();
    if (
      this.TokenActual.Tipo == Token.P_Int ||
      this.TokenActual.Tipo == Token.P_Float ||
      this.TokenActual.Tipo == Token.P_Char ||
      this.TokenActual.Tipo == Token.P_String ||
      this.TokenActual.Tipo == Token.P_Bool
    ) {
      this.Tipo();
      this.parea(Token.id);
      this.parea(Token.igual);
      this.Expresion();
    } else {
      this.parea(Token.id);
      this.parea(Token.igual);
      this.Expresion();
    }
  }

  public SentenciaImprime(): void {
    this.parea(Token.P_Console);
    this.parea(Token.punto);
    this.parea(Token.P_WriteLine);
    this.parea(Token.parentesis_izq);
    this.Expresion();
    this.parea(Token.parentesis_derecho);
    this.parea(Token.punto_y_coma);
  }

  public SentenciaSwitch_case(): void {
    this.parea(Token.P_switch);
    this.parea(Token.parentesis_izq);

    this.Expresion();
    
    this.parea(Token.parentesis_derecho);
    
    this.Traduccion += "switcher =";
    this.parea(Token.llave_izq);
    this.salto();

    this.Tabulador++;
    this.ListaCases();
    this.defaultP();
    this.Tabulador--;

    this.parea(Token.llave_derecha);
    this.salto();
  }
  public ListaCases(): void {
    this.caseP();
    this.ListaCasesP();
  }

  public ListaCasesP(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.P_case) {
      this.caseP();
      this.defaultP();
      this.ListaCasesP();
      
    }else if (this.TokenActual.Tipo != Token.llave_derecha  && this.TokenActual.Tipo != Token.sharp  ) {
      this.Actual++;
      this.TokenActual = this.Lexico[this.Actual];

      this.caseP();
      this.ListaCasesP();
    }
     else {
      // epsilon -----
    }
  }
  public caseP(): void {
    if(this.TokenActual.Tipo == Token.P_case){
      this.tab();

    this.parea(Token.P_case);
    this.opcionCase();
    this.parea(Token.dosPuntos);
    this.salto();

    this.PR_break = true;

    this.Tabulador++;
    this.List_Intrucciones();
    this.Tabulador--;

    //this.parea(Token.P_break);
    //this.parea(Token.punto_y_coma);
    }
  }
  public opcionCase(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.numero) {
      this.parea(Token.numero);
    } else if (this.TokenActual.Tipo == Token.cadena) {
      this.parea(Token.cadena);
    } else {
      this.parea(Token.caracter); // cae un error si no es un caracter acá
    }
  }
  public defaultP(): void {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.P_default) {
      this.tab();
      this.parea(Token.P_default);
      this.parea(Token.dosPuntos);
      this.salto();

      this.Tabulador++;
      this.List_Intrucciones();
      this.Tabulador--;

      this.parea(Token.P_break);
      this.parea(Token.punto_y_coma);
    } else {
      // epsilón :v
    }
  }

  Tipo() {
    this.ignoraComentarios();
    if (this.TokenActual.Tipo == Token.P_Int) {
      this.parea(Token.P_Int);
    } else if (this.TokenActual.Tipo == Token.P_Float) {
      this.parea(Token.P_Float);
    } else if (this.TokenActual.Tipo == Token.P_Char) {
      this.parea(Token.P_Char);
    } else if (this.TokenActual.Tipo == Token.P_String) {
      this.parea(Token.P_String);
    } else if (this.TokenActual.Tipo == Token.P_Double) {
      this.parea(Token.P_Double);
    } else if (this.TokenActual.Tipo == Token.P_Bool){
      this.parea(Token.P_Bool);
    } else{
      this.parea(Token.id);
    }
  }

  parea(Tipo: Token): void {
    // hacer un while que para este que el token no sea comentario
    this.ignoraComentarios();

    if (this.TokenActual.Tipo == Token.sharp) {
      this.Traducir = true;
    }

    if (this.Traducir == true) {

      if (this.TokenActual.Tipo != Tipo) {
        //ERROR si no viene lo que deberia  , CREAR UNA LISTA DE ERRORES SINTACTICOS

        this.LS_Error.push({
          No: this.LS_Error.length,
          Fila: this.TokenActual.Fila,
          Columna: this.TokenActual.Columna,
          Descripcion:
            "Error Se Encontro " +
            this.getTipo_Error(this.TokenActual.Tipo) +
            " se esperaba " +
            this.getTipo_Error(Tipo),
          TipoE: "SINTÁCTICO",
        });

        this.Traducir = false;
        while (
          this.TokenActual.Tipo != Token.punto_y_coma &&
          this.TokenActual.Tipo != Token.llave_derecha &&
          this.TokenActual.Tipo != Token.sharp
        ) {
          this.AjustarSalto(this.TokenActual.Tipo);
          this.Actual++;
          this.TokenActual = this.Lexico[this.Actual];
        }

        this.Traduccion += "\n";
      } else {
        
        // console.log(" Se Encontro " + this.getTipo_Error(this.TokenActual.Tipo));
        if (this.TokenActual.Tipo != Token.sharp) {
          if (this.Continuar) {
            ///this.ControldeLLaves(); // PARA LAS LISTAS ID que llevan , ni tabs
            
            if (
              this.TokenActual.Tipo == Token.P_Int ||
              this.TokenActual.Tipo == Token.P_Float ||
              this.TokenActual.Tipo == Token.P_Char ||
              this.TokenActual.Tipo == Token.P_String ||
              this.TokenActual.Tipo == Token.P_Double ||
              this.TokenActual.Tipo == Token.P_Bool ||
              this.TokenActual.Tipo == Token.P_void
            ) {
              this.Traduccion += "var ";
            }
            else if (
              this.TokenActual.Tipo == Token.punto_y_coma ||
              this.TokenActual.Tipo == Token.P_case  &&
              this.NSalto == false
            ) {
              this.Traduccion += "\n";
            }
            else{
              this.Traduccion += this.TokenActual.Lexema;
              this.Traduccion += " ";
            }
            this.NSalto = false;
          } 
          } // fin traducir

          this.Actual++;
          this.TokenActual = this.Lexico[this.Actual];
        }

      }
  }

  public ignoraComentarios(): void {
    while (
      this.TokenActual.Tipo == Token.comentarioBloques ||
      this.TokenActual.Tipo == Token.comentarioLinea
    ) {
      if (this.TokenActual.Tipo == Token.comentarioLinea) {
        this.Traduccion += "\n";
      }
      this.tab();
      this.Traduccion += this.TokenActual.Lexema;
      this.Traduccion += "\n";

      this.Actual++;
      this.TokenActual = this.Lexico[this.Actual];
    }
  }

  public AjustarSalto(Tipo: Token) {
    if (Tipo == Token.llave_izq) {
      this.Tabulador++;
    } else if (Tipo == Token.llave_derecha) {
      if (this.Tabulador > 0) {
        this.Tabulador--;
      }
    }
  }

  public salto() {
    if (this.Traducir == true) {
      this.Traduccion += "\n";
    }
  }

  public tab(): void {
    if (this.Traducir == true) {
      for (let index = 0; index < this.Tabulador; index++) {
        this.Traduccion += "\t";
      }
    }
  }

  public ControldeLLaves(): void {
    if (this.TokenActual.Tipo == Token.llave_izq && this.NLlagves == true) {
      // no doy tabulaciones  , ni muevo el contador
      this.Traduccion += "[";
    } else if (
      this.TokenActual.Tipo == Token.llave_derecha &&
      this.NLlagves == true
    ) {
      // no doy tabulaciones  , ni muevo el contador
      this.Traduccion += "]";
      this.NLlagves = false;
    } else if (this.TokenActual.Tipo == Token.llave_izq) {
      this.Tabulador++;
      alert("contador de tabs POR LLAVE + :" + this.Tabulador);
    } else if (this.TokenActual.Tipo == Token.llave_derecha) {
      this.Tabulador--;
      alert("contador de tabs POR LLAVE - en :" + this.Tabulador);
    }
  }

  metodoExpresion() {
    if (this.TokenActual.Tipo == Token.parentesis_izq) {
      this.parea(Token.parentesis_izq);
      this.SentenciaMetodo();
    } else {
      //EPSILON
    }
  }

  SentenciaMetodo() {
    if (this.TokenActual.Tipo == Token.parentesis_derecho) {
      this.parea(Token.parentesis_derecho);
    } else {
      this.List_Expresiones();
      this.parea(Token.parentesis_derecho);
    }
  }

  getTipo_Error(Tipo_token: Token): string {
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

  
  public traduce() {
    
    let comentarioBloque:string = "\'\'\'";
    this.Traduccion = this.Traduccion.replace(/\/\//g, "#");
    this.Traduccion = this.Traduccion.replace(/\/\*/g, comentarioBloque);
    this.Traduccion = this.Traduccion.replace(/\*\//g, comentarioBloque);
    //ya tiene comentarios 
    this.Traduccion = this.Traduccion.replace(/int/g,'');
    this.Traduccion = this.Traduccion.replace(/float/g,'');
    this.Traduccion = this.Traduccion.replace(/bool/g,'');
    this.Traduccion = this.Traduccion.replace(/string/g, '');
    this.Traduccion = this.Traduccion.replace(/char/g, '');
    this.Traduccion = this.Traduccion.replace(/;/g, '');
    // ya estan los tipos
    this.Traduccion = this.Traduccion.replace(/{/g, '');
    this.Traduccion = this.Traduccion.replace(/Console . Write/g,"print");
    this.Traduccion = this.Traduccion.replace(/}/g, '');
    
    console.log(this.Traduccion);
}
}

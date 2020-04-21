export enum Token {
    sb_mas,
    sb_menos,
    sb_por,
    sb_division,
    sb_and,
    sb_or,
    sb_not,

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

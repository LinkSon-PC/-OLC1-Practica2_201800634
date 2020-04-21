import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ObjetoHtml{
  HTML:string;
  JSON:string;
}

export class HtmlModule { 
  HTML:string;
  JSON:string;

  Objeto:ObjetoHtml = {
    HTML: "",
    JSON: ""
  }

  constructor(cadena:string){
    this.HTML = cadena;
    this.ModificarHtml(cadena);
    this.MetodoJSON(cadena);

    this.Objeto.HTML = this.HTML;
    this.Objeto.JSON = this.JSON;
  }

  ModificarHtml(html:string){
    let estado:number =0;
    let tabulador:number  =0;

    let cadena:string ="";

    for (let i = 0; i < html.length; i++) {
      switch(estado){
        case 0:
          cadena+="\n";
          
          for (let i = 0; i < tabulador; i++) {
            cadena+="\t";
          }

          if(html[i] === "<"){
            estado =1;
          }else{
            tabulador++;
            estado =3;
          }
            cadena += html[i];
          break;
        case 1:
          if(html[i] === "/"){
            tabulador-=2;
          }
          cadena += html[i];
          estado =2;
          break;
        case 2:
          
          if(html[i] === ">"){
            estado =0;
          }else{
            estado =2;
          }
          cadena += html[i];
          break;

          case 3:
  
            if(html[i] === "<"){
              i--;
              estado =0;
            }else{
              cadena += html[i];
            }
            break;
      }
      
    }

    console.log(cadena);
  }


  MetodoJSON(html:string){
    
    let estado:number =0;
    let tabulador:number  =0;

    let cadena:string ="";

    for (let i = 0; i < html.length; i++) {
      switch(estado){
        case 0:
          cadena+="\n";
          while(html[i] === "\t" || html[i] === "\n" || html[i] === "\r" || html[i] === " "){
            i++;
            
          }
          
          for (let i = 0; i < tabulador; i++) {
            cadena+="\t";
          }

          if(html[i] === "<"){
            estado =1;
          }else{
            tabulador++;
            estado =3;
          }
            cadena += html[i];
          break;
        case 1:
          if(html[i] === "/"){
            tabulador-=2;
          }
          cadena += html[i];
          estado =2;
          break;
        case 2:
          
          if(html[i] === ">"){
            estado =0;
            if(cadena[1].toString()==="/"){
              this.JSON += "}," + "\n";
            }else{
              let aux:string[] = cadena.split("=");

                this.JSON += "\"" + aux[0].substring(1, aux[0].length) +"\""+ ":{ \n";
              if(aux.length>1){
                this.JSON += + "\t" + "\"" + "STYLE: " +"\""+ aux[1] + "\" ,";
              }
            }
            cadena ="";
          }else{
            estado =2;
          }
          cadena += html[i];
          break;

          case 3:
  
            if(html[i] === "<"){
              this.JSON+="\"TEXTO\": \" "+ cadena + " \" ";
              i--;
              estado =0;
              cadena="";
            }else{
              cadena += html[i];
            }
            break;
      }
      
    }

    console.log(this.JSON);
  }

  Tab(salto:number, cadena:string){
    for (let i = 0; i < salto; i++) {
      cadena+="\t";
    }
  }

  getReporte():ObjetoHtml{
    return this.Objeto;
  }
}

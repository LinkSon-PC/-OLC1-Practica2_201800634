import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SintacticoService {
  Traduccion:string;

  Continuar:boolean;
  NLlagves:boolean;
  NSalto:boolean;
  Tabulador:number;

  constructor() {
    this.Continuar = true;
   }
}

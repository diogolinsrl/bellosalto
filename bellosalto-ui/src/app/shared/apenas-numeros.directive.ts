import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appApenasNumeros]'
})
export class ApenasNumerosDirective {

  @Input() control: FormControl;
  
  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event']) onKeyDown(event) {

    var valor = new String(this.elementRef.nativeElement.value);
    var valorApenasNumeros = "";

    for (var i = 0; i < valor.length;i++) {
      if (valor.charCodeAt(i) >= 48 && valor.charCodeAt(i) <= 57){
        valorApenasNumeros = valorApenasNumeros + valor.charAt(i);
      }
    }

    this.elementRef.nativeElement.value = valorApenasNumeros;
 
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ApenasNumerosDirective } from './apenas-numeros.directive';

@NgModule({
  declarations: [
    MessageComponent, 
    ApenasNumerosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    ApenasNumerosDirective
  ]
})
export class SharedModule { }

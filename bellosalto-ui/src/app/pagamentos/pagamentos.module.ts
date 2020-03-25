import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentosPendentesComponent } from './pagamentos-pendentes/pagamentos-pendentes.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PagamentosRoutingModule } from './pagamentos-routing.module';

@NgModule({
  declarations: [PagamentosPendentesComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SharedModule,
    PagamentosRoutingModule
  ]
})
export class PagamentosModule { }

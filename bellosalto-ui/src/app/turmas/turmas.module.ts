import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { TurmasPesquisaComponent } from './turmas-pesquisa/turmas-pesquisa.component';
import { TurmasRoutingModule } from './turmas-routing.module';

@NgModule({
  declarations: [TurmasPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SharedModule,
    TurmasRoutingModule
  ]
})
export class TurmasModule { }

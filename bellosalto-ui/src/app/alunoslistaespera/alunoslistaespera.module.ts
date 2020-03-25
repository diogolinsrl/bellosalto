import { AlunosListaEsperaRoutingModule } from './alunoslistaespera-routing.module';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AlunosListaEsperaPesquisaComponent } from './alunoslistaespera-pesquisa/alunoslistaespera-pesquisa.component';
import { AlunoListaEsperaCadastroComponent } from './alunolistaespera-cadastro/alunolistaespera-cadastro.component';

@NgModule({
  declarations: [
    AlunosListaEsperaPesquisaComponent,
    AlunoListaEsperaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    InputMaskModule,
    CheckboxModule,
    SharedModule,
    AlunosListaEsperaRoutingModule
  ]
})
export class AlunosListaEsperaModule { }

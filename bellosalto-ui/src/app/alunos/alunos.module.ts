import { AlunosRoutingModule } from './alunos-routing.module';
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
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';

@NgModule({
  declarations: [
    AlunosPesquisaComponent,
    AlunoCadastroComponent
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
    AlunosRoutingModule
  ]
})
export class AlunosModule { }

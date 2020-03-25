import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosListaEsperaPesquisaComponent } from './alunoslistaespera-pesquisa/alunoslistaespera-pesquisa.component';
import { AlunoListaEsperaCadastroComponent } from './alunolistaespera-cadastro/alunolistaespera-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'alunoslistaespera',
      component: AlunosListaEsperaPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_ALUNO_LISTA_ESPERA']}
    },
    {
      path: 'alunoslistaespera/novo',
      component: AlunoListaEsperaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_ALUNO_LISTA_ESPERA']}
    },
    {
      path: 'alunoslistaespera/:codigo',
      component: AlunoListaEsperaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_ALUNO_LISTA_ESPERA', 'ROLE_CADASTRAR_ALUNO_LISTA_ESPERA']}
    }
  ];

  @NgModule({

    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })

  export class AlunosListaEsperaRoutingModule { }

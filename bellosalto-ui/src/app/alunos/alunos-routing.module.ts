import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'alunos',
      component: AlunosPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_ALUNO']}
    },
    {
      path: 'alunos/novo',
      component: AlunoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_ALUNO']}
    },
    {
      path: 'alunos/:codigo',
      component: AlunoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_ALUNO', 'ROLE_CADASTRAR_ALUNO']}
    }
  ];

  @NgModule({

    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })

  export class AlunosRoutingModule { }

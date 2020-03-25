import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurmasPesquisaComponent } from './turmas-pesquisa/turmas-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'turmas',
      component: TurmasPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_TURMA']}
    }
  ];

  @NgModule({

    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })

  export class TurmasRoutingModule { }

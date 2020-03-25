import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { PagamentosPendentesComponent } from './pagamentos-pendentes/pagamentos-pendentes.component';

const routes: Routes = [
    {
      path: 'pagamentosPendentes',
      component: PagamentosPendentesComponent,
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

  export class PagamentosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'clientes',
      component: ClientesPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_CLIENTE']}
    },
    {
      path: 'clientes/novo',
      component: ClienteCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_CLIENTE']}
    },
    {
      path: 'clientes/:codigo',
      component: ClienteCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CONSULTAR_CLIENTE', 'ROLE_CADASTRAR_CLIENTE']}
    }
  ];

  @NgModule({

    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })

  export class ClientesRoutingModule { }

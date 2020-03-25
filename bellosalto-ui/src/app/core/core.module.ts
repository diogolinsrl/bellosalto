import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BelloSaltoHttp } from '../seguranca/bellosalto-http';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    GrowlModule,
    ConfirmDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    JwtHelperService,
    BelloSaltoHttp,
    { provide : LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }

import { AlunosModule } from './alunos/alunos.module';
import { AlunosListaEsperaModule } from './alunoslistaespera/alunoslistaespera.module';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { TurmasModule } from './turmas/turmas.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    CoreModule,
    ClientesModule,
    AlunosModule,
    AlunosListaEsperaModule,
    TurmasModule,
    PagamentosModule,
    HttpClientModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

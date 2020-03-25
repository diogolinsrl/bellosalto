import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';
import { TurmaFiltro, TurmaService } from '../turma.service';


@Component({
  selector: 'app-turmas-pesquisa',
  templateUrl: './turmas-pesquisa.component.html',
  styleUrls: ['./turmas-pesquisa.component.css']
})
export class TurmasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new TurmaFiltro();
  turmasConsultadasDTO = [];
  @ViewChild('tabela', { static: true }) tabela;

  constructor(
    private turmaService: TurmaService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private title: Title
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Turmas');
    this.pesquisar();
  }

  pesquisar() {

    this.turmaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.length,
        this.turmasConsultadasDTO = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  limpar() {
    this.filtro.nome = '';
    this.pesquisar();
  }

}

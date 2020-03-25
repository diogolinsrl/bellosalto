import { ActivatedRoute } from '@angular/router';
import { AlunoListaEspera } from 'src/app/core/model';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { AlunoListaEsperaFiltro } from './../alunolistaespera.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunoListaEsperaService } from '../alunolistaespera.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';
import { TurmaService } from 'src/app/turmas/turma.service';


@Component({
  selector: 'app-alunoslistaespera-pesquisa',
  templateUrl: './alunoslistaespera-pesquisa.component.html',
  styleUrls: ['./alunoslistaespera-pesquisa.component.css']
})
export class AlunosListaEsperaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  qtExibidos = 0;
  filtro = new AlunoListaEsperaFiltro();
  alunosListaEspera: AlunoListaEspera[] = [];
  situacoes = [
    { label: '-- Todos --', value: '' },
    { label: 'Aguardando', value: 'AGUARDANDO' },
    { label: 'Matriculado', value: 'MATRICULADO' },
    { label: 'Desistência', value: 'DESISTENCIA' }
  ];

  turmas = [
    { label: '-- Todos --', value: '' }
  ];

  @ViewChild('tabela', { static: true }) tabela;

  constructor(
    private alunoListaEsperaService: AlunoListaEsperaService,
    private turmaService: TurmaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Alunos da Lista de Espera');

    this.activatedRoute.params.subscribe(params => {
      if (params['tr']) {
        this.filtro.codigoTurma = params['tr'];
        this.filtro.situacao = 'AGUARDANDO';
      }
    });

    this.carregarTurmas();

}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.alunoListaEsperaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total,
        this.qtExibidos = resultado.qtExibidos,
        this.alunosListaEspera = resultado.alunosListaEspera;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  clicouTurma() {

    if (this.filtro.codigoTurma != '') {
      this.filtro.situacao = 'AGUARDANDO';
    } else {
      this.filtro.situacao = '';
    }
    
    this.pesquisar();
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(alunoListaEspera: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(alunoListaEspera);
      }
    });
  }

  excluir(alunoListaEspera: any) {

    this.alunoListaEsperaService.excluir(alunoListaEspera.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Aluno da Lista de Espera excluído com sucesso!' });
        this.tabela.first = 0;
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTurmas() {
    this.turmaService.listarTodas()
      .then(turmas => {
        this.turmas = this.turmas.concat(turmas
          .map(t => ({ label: t.nome, value: '' + t.codigo })));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  limpar() {
    this.filtro.nomeAluno = '';
    this.filtro.nomeResponsavel = '';
    this.filtro.situacao = 'AGUARDANDO';
    this.filtro.codigoTurma = '';
    
    this.pesquisar();
  }

}

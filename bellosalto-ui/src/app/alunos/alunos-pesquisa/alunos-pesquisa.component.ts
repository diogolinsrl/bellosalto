import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../clientes/cliente.service';
import { Aluno } from 'src/app/core/model';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { AlunoFiltro } from './../aluno.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';
import { TurmaService } from 'src/app/turmas/turma.service';


@Component({
  selector: 'app-alunos-pesquisa',
  templateUrl: './alunos-pesquisa.component.html',
  styleUrls: ['./alunos-pesquisa.component.css']
})
export class AlunosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  qtExibidos = 0;
  filtro = new AlunoFiltro();
  alunos: Aluno[] = [];
  situacoes = [
    { label: '-- Todos --', value: '' },
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ];

  clientes = [
    { label: '-- Todos --', value: '' }
  ];
  turmas = [
    { label: '-- Todos --', value: '' }
  ];

  @ViewChild('tabela', { static: true }) tabela;

  constructor(
    private alunoService: AlunoService,
    private clienteService: ClienteService,
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
    this.title.setTitle('Pesquisa de Alunos');

    this.carregarClientes();

    this.activatedRoute.params.subscribe(params => {
      if (params['cl']) {
        this.filtro.codigoCliente = params['cl'];
        this.filtro.situacao = '';
      }
      if (params['tr']) {
        this.filtro.codigoTurma = params['tr'];
        this.filtro.situacao = '';
      }
    });

    this.carregarTurmas();

}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.alunoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total,
        this.qtExibidos = resultado.qtExibidos,
        this.alunos = resultado.alunos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(aluno: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(aluno);
      }
    });
  }

  excluir(aluno: any) {

    this.alunoService.excluir(aluno.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Aluno excluído com sucesso!' });
        this.tabela.first = 0;
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getIdade(aluno: Aluno) {

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();

    const diaAniversario = +parseInt(aluno.dataNascimento.toString().substr(0, 2), 10);
    const mesAniversario = +parseInt(aluno.dataNascimento.toString().substr(3, 5), 10);
    const anoAniversario = +parseInt(aluno.dataNascimento.toString().substr(6, 10), 10);

    let quantos_anos = anoAtual - anoAniversario;

    if (mesAtual < mesAniversario || mesAtual === mesAniversario && diaAtual < diaAniversario) {
      quantos_anos--;
    }

    quantos_anos = quantos_anos < 0 ? 0 : quantos_anos;

    return quantos_anos;
  }

  carregarClientes() {
    this.clienteService.listarTodos()
      .then(clientes => {
        this.clientes = this.clientes.concat(clientes
          .map(c => ({ label: c.nome, value: '' + c.codigo })));
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
    this.filtro.nome = '';
    this.filtro.situacao = 'ATIVO';
    this.filtro.codigoCliente = '';
    this.filtro.codigoTurma = '';
    
    this.pesquisar();
  }

}

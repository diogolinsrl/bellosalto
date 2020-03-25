import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ClienteFiltro } from './../cliente.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-clientes-pesquisa',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  qtExibidos = 0;
  filtro = new ClienteFiltro();
  clientes = [];
  @ViewChild('tabela', { static: true }) tabela;

  situacoes = [
    {label: '-- Todos --', value: ''},
    {label: 'Ativo', value: 'ATIVO'},
    {label: 'Inativo', value: 'INATIVO'}
  ];

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private title: Title
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Clientes');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.clienteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total,
        this.qtExibidos = resultado.qtExibidos,
        this.clientes = resultado.clientes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(cliente: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cliente);
      }
    });
  }

  excluir(cliente: any) {

    this.clienteService.excluir(cliente.codigo)
      .then(() => {
        this.messageService.add({ severity : 'success', detail : 'Cliente excluído com sucesso!'});
        this.tabela.first = 0;
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  limpar() {
    this.filtro.nome = '';
    this.filtro.situacao = 'ATIVO';
    this.pesquisar();
  }

}

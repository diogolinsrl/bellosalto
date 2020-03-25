import { Component, OnInit } from '@angular/core';
import { ContaAzulService, PagamentosPendentes } from 'src/app/core/contaazul.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pagamentos-pendentes',
  templateUrl: './pagamentos-pendentes.component.html',
  styleUrls: ['./pagamentos-pendentes.component.css']
})
export class PagamentosPendentesComponent implements OnInit {

  totalRegistros = 0;
  pagamentosPendentes: PagamentosPendentes[];

  constructor(
    private contaAzulService: ContaAzulService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pagamentos Pendentes');
    this.pesquisarPagamentosPendentes();
  }

  pesquisarPagamentosPendentes() {

    this.contaAzulService.pesquisarPagamentosPendentes()
      .then(response => {

        const mapaPagamentosPendentes = new Map<string, PagamentosPendentes>();

        console.log(response);

        for (var pag of response) {

          if (pag.payment != null && pag.payment.installments != null && pag.payment.installments.length > 0
            && (pag.payment.installments[0].status == 'PENDING' || pag.payment.installments[0].status == 'OVERDUE')) {

            let pagamentosPendentes: PagamentosPendentes;

            if (!mapaPagamentosPendentes.has(pag.customer.id)) {
              pagamentosPendentes = new PagamentosPendentes();
              pagamentosPendentes.idCliente = pag.customer.id;
              pagamentosPendentes.nomeCliente = pag.customer.name;
              pagamentosPendentes.qtPagamentosPendentes = 1;
              pagamentosPendentes.totalPagamentosPendentes = pag.total;
            } else {
              pagamentosPendentes = mapaPagamentosPendentes.get(pag.customer.id);
              pagamentosPendentes.qtPagamentosPendentes = pagamentosPendentes.qtPagamentosPendentes + 1;
              pagamentosPendentes.totalPagamentosPendentes = pagamentosPendentes.totalPagamentosPendentes + pag.total;
            }

            mapaPagamentosPendentes.set(pagamentosPendentes.idCliente, pagamentosPendentes);

            let arrayPagamentosPendentes: PagamentosPendentes[] = new Array();

            arrayPagamentosPendentes = Array.from(mapaPagamentosPendentes.values()).sort((obj1, obj2) => {
              if (obj1.nomeCliente > obj2.nomeCliente) {
                return 1;
              }

              if (obj1.nomeCliente < obj2.nomeCliente) {
                return -1;
              }

              return 0;
            });

            this.pagamentosPendentes = arrayPagamentosPendentes;
            this.totalRegistros = this.pagamentosPendentes.length;
          }
        }
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  cancelarDesconto() {
    this.messageService.add({ severity: 'success', detail: 'Descontos cancelados com sucesso!' });
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Cliente } from '../core/model';
import { BelloSaltoHttp } from '../seguranca/bellosalto-http';
import { environment } from './../../environments/environment';

export class ClienteFiltro {
  nome: string;
  situacao = 'ATIVO';
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientesUrl: string;

  constructor(private http: BelloSaltoHttp) {
    this.clientesUrl = `${environment.apiUrl}/clientes`;
   }

  pesquisar(filtro: ClienteFiltro): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      filtro.nome = filtro.nome.trim();
      params = params.append('nome', filtro.nome);
    }

    if (filtro.situacao) {
      params = params.append('situacao', filtro.situacao);
    }

    return this.http.get(`${this.clientesUrl}`, {headers, params})
      .toPromise()
      .then(response => {

        const resultado = {
          clientes: response['content'],
          total: response['totalElements'],
          qtExibidos: response['numberOfElements']
        };

        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders();

      return this.http.delete(`${this.clientesUrl}/${codigo}`, {headers})
        .toPromise()
        .then(() => null);
  }

  adicionar(cliente: Cliente): Promise<Cliente> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      return this.http.post<Cliente>(this.clientesUrl, cliente, {headers})
        .toPromise();

  }

  atualizar(cliente: Cliente): Promise<Cliente> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      return this.http.put<Cliente>(`${this.clientesUrl}/${cliente.codigo}`, cliente, {headers})
        .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<Cliente> {
    const headers = new HttpHeaders();

    return this.http.get<Cliente>(`${this.clientesUrl}/${codigo}`, {headers})
      .toPromise();
  }

  listarTodos(): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    params = params.append('page', '0');
    params = params.append('size', '500');
    params = params.append('situacao', 'ATIVO');

    return this.http.get<any>(`${this.clientesUrl}`, {headers, params})
      .toPromise()
      .then(response => response.content);
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Aluno } from '../core/model';
import { BelloSaltoHttp } from '../seguranca/bellosalto-http';
import { environment } from './../../environments/environment';

export class AlunoFiltro {
  nome: string;
  codigoCliente: string;
  codigoTurma: string;
  situacao = 'ATIVO';
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  alunosUrl: string;

  constructor(private http: BelloSaltoHttp) {
    this.alunosUrl = `${environment.apiUrl}/alunos`;
  }

  pesquisar(filtro: AlunoFiltro): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    if (filtro.nome) {
      filtro.nome = filtro.nome.trim();
      params = params.append('nome', filtro.nome);
    }

    if (filtro.situacao) {
      params = params.append('situacao', filtro.situacao);
    }

    if (filtro.codigoCliente) {
      params = params.append('codigoCliente', filtro.codigoCliente);
    }

    if (filtro.codigoTurma) {
      params = params.append('codigoTurma', filtro.codigoTurma);
      filtro.pagina = 0;
      filtro.itensPorPagina = 30;
    } else {
      filtro.itensPorPagina = 10;
    }

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.alunosUrl}`, { headers, params })
      .toPromise()
      .then(response => {

        const resultado = {
          alunos: response['content'],
          total: response['totalElements'],
          qtExibidos: response['numberOfElements']
        };

        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders();

    return this.http.delete(`${this.alunosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(aluno: Aluno): Promise<Aluno> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Aluno>(this.alunosUrl, aluno, { headers })
      .toPromise();

  }

  atualizar(aluno: Aluno): Promise<Aluno> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Aluno>(`${this.alunosUrl}/${aluno.codigo}`, aluno, { headers })
      .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<Aluno> {
    const headers = new HttpHeaders();

    return this.http.get<Aluno>(`${this.alunosUrl}/${codigo}`, { headers })
      .toPromise();
  }
}

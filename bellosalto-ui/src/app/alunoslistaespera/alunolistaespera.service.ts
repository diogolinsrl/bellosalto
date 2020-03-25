import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AlunoListaEspera } from '../core/model';
import { BelloSaltoHttp } from '../seguranca/bellosalto-http';
import { environment } from './../../environments/environment';

export class AlunoListaEsperaFiltro {
  nomeAluno: string;
  nomeResponsavel: string;
  codigoTurma: string;
  situacao = 'AGUARDANDO';
  pagina = 0;
  itensPorPagina = 20;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoListaEsperaService {

  alunosListaEsperaUrl: string;

  constructor(private http: BelloSaltoHttp) {
    this.alunosListaEsperaUrl = `${environment.apiUrl}/alunosListaEspera`;
  }

  pesquisar(filtro: AlunoListaEsperaFiltro): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    if (filtro.nomeAluno) {
      filtro.nomeAluno = filtro.nomeAluno.trim();
      params = params.append('nomeAluno', filtro.nomeAluno);
    }

    if (filtro.nomeResponsavel) {
      filtro.nomeResponsavel = filtro.nomeResponsavel.trim();
      params = params.append('nomeResponsavel', filtro.nomeResponsavel);
    }

    if (filtro.situacao) {
      params = params.append('situacao', filtro.situacao);
    }

    if (filtro.codigoTurma) {
      params = params.append('codigoTurma', filtro.codigoTurma);
    }

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.alunosListaEsperaUrl}`, { headers, params })
      .toPromise()
      .then(response => {

        const resultado = {
          alunosListaEspera: response['content'],
          total: response['totalElements'],
          qtExibidos: response['numberOfElements']
        };

        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders();

    return this.http.delete(`${this.alunosListaEsperaUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(alunoListaEspera: AlunoListaEspera): Promise<AlunoListaEspera> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<AlunoListaEspera>(this.alunosListaEsperaUrl, alunoListaEspera, { headers })
      .toPromise();

  }

  atualizar(alunoListaEspera: AlunoListaEspera): Promise<AlunoListaEspera> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<AlunoListaEspera>(`${this.alunosListaEsperaUrl}/${alunoListaEspera.codigo}`, 
      alunoListaEspera, { headers })
      .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<AlunoListaEspera> {
    const headers = new HttpHeaders();

    return this.http.get<AlunoListaEspera>(`${this.alunosListaEsperaUrl}/${codigo}`, { headers })
      .toPromise();
  }
}

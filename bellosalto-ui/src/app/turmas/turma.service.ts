import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Turma, TurmaConsultadaDTO } from '../core/model';
import { BelloSaltoHttp } from '../seguranca/bellosalto-http';
import { environment } from './../../environments/environment';

export class TurmaFiltro {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  turmasUrl: string;
  turmasPorNomeUrl: string;

  constructor(private http: BelloSaltoHttp) {
    this.turmasUrl = `${environment.apiUrl}/turmas`;
    this.turmasPorNomeUrl = `${environment.apiUrl}/turmas/porNome`;
   }

  pesquisarPorNome(filtro: TurmaFiltro): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(`${this.turmasPorNomeUrl}`, {headers, params})
      .toPromise()
      .then(response => {

        const resultado = {
          turmas: response['content'],
          total: response['totalElements']
        };

        return resultado;
      });

  }

  pesquisar(filtro: TurmaFiltro): Promise<TurmaConsultadaDTO[]> {

    let params = new HttpParams();
    const headers = new HttpHeaders();

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    let turmas : TurmaConsultadaDTO[] = new Array();

    return this.http.get(`${this.turmasUrl}`, {headers, params})
      .toPromise()
      .then(response => {

        for (let i = 0;i < (response as Array<any>).length;i++) {
          
          turmas.push( {
            turma: response[i]['turma'],
            qtAlunosMatriculados: response[i]['qtAlunosMatriculados']
          });
        }

        return turmas;
      });

  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders();

      return this.http.delete(`${this.turmasUrl}/${codigo}`, {headers})
        .toPromise()
        .then(() => null);
  }

  adicionar(turma: Turma): Promise<Turma> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      return this.http.post<Turma>(this.turmasUrl, turma, {headers})
        .toPromise();

  }

  atualizar(turma: Turma): Promise<Turma> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      return this.http.put<Turma>(`${this.turmasUrl}/${turma.codigo}`, turma, {headers})
        .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<Turma> {
    const headers = new HttpHeaders();

    return this.http.get<Turma>(`${this.turmasUrl}/${codigo}`, {headers})
      .toPromise();
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.turmasPorNomeUrl)
      .toPromise()
      .then(response => response.content);
  }

}

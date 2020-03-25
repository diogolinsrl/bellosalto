import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class CEPConsultado {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuscaCEPService {

  buscaCEPUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.buscaCEPUrl = `https://api.postmon.com.br/v1/cep/`;
  }

  pesquisar(cep: string): Promise<CEPConsultado> {

    console.log('Pesquisando cep ' + cep)
    let params = new HttpParams();
    const headers = new HttpHeaders();

    return this.http.get<CEPConsultado>(this.buscaCEPUrl.concat(cep), { headers, params })
      .toPromise();
  }

}

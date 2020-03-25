import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SaleResponse, CustomerRequest, AddressRequest, CustomerResponse } from './modelContaAzul';
import { Cliente } from './model';

export class PagamentosPendentes {
  idCliente: string;
  nomeCliente: string;
  qtPagamentosPendentes: number;
  totalPagamentosPendentes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContaAzulService {

  contaAzulBasicUrl: string;
  contaAzulOAuthUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.contaAzulBasicUrl = `https://api.contaazul.com/auth/authorize?redirect_uri=https://app.bellosalto.com/&client_id=wlKrvj6gECuNErZNhN0S6F3iZFlocUSc&scope=sales&state=1`;
    this.contaAzulOAuthUrl = `https://api.contaazul.com/oauth2/token?grant_type=authorization_code&redirect_uri=https://app.bellosalto.com/&code=`;

    this.carregarToken();
  }

  loginContaAzul() {
    window.location.href = this.contaAzulBasicUrl;
  }

  login(code: string, state: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', 'https://app.bellosalto.com')
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic d2xLcnZqNmdFQ3VORXJaTmhOMFM2RjNpWkZsb2NVU2M6ZW5MWXA1blE3ZjQwa1B5MHF4Ukpjc09HN0RjODBMMjM=');

    const body = ``;

    const proxy = 'https://cors-anywhere.herokuapp.com/';

    console.log('Logando no Conta Azul...');

    return this.http.post<any>(proxy + this.contaAzulOAuthUrl + code, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
        console.log(response['access_token']);
        this.armazenarToken(response['access_token']);

        console.log('Logado com sucesso no Conta Azul.');

      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error && response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.contaAzulBasicUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        console.log('Novo access token Conta Azul criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  private armazenarToken(token: string) {
    //this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('tokenContaAzul', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('tokenContaAzul');

    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('tokenContaAzul');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken() {
    localStorage.removeItem('tokenContaAzul');
    this.jwtPayload = null;
  }

  sincronizarCliente(cliente: Cliente): Promise<string> {

    console.log('Pesquisando cliente por CPF...')
    let params = new HttpParams();
    params = params.append('document', cliente.cpf);
    
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('tokenContaAzul'));

    const httpContaAzul = this.http;

    let promise = new Promise<string>(function(resolve, reject) {

      httpContaAzul.get<CustomerResponse[]>(`https://api.contaazul.com/v1/customers`, { headers, params })
      .toPromise()
      .catch(() => reject('Erro ao consultar o Conta Azul'))
      .then((response: CustomerResponse[]) => {
  
        console.log(response);
  
        if (response.length > 1) {
          reject('Existe mais de um cliente cadastrado com o mesmo CPF!');
        }
  
        if (response.length == 0) {
          let customerRequest = new CustomerRequest();
          customerRequest.name = cliente.nome;
          customerRequest.email = cliente.email;
          customerRequest.business_phone = cliente.telefonePrincipal;
          customerRequest.mobile_phone = cliente.telefonePrincipal;
          customerRequest.person_type = 'NATURAL';
          customerRequest.document = cliente.cpf;
          customerRequest.identity_document = cliente.rg + '';
          customerRequest.document = cliente.cpf;
          customerRequest.state_registration_number = '';
          customerRequest.state_registration_type = 'NO_CONTRIBUTOR';
          console.log(cliente.dataNascimento.toString());

          var parts = cliente.dataNascimento.toString().split("/");
          var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
          console.log(dt);
          console.log(dt.toISOString());
          customerRequest.date_of_birth = dt.toISOString();
  
          let addressRequest = new AddressRequest();
          addressRequest.street = cliente.endereco.logradouro;
          addressRequest.number = cliente.endereco.numero;
          addressRequest.complement = cliente.endereco.complemento;
          addressRequest.zip_code = cliente.endereco.cep;
          addressRequest.neighborhood = cliente.endereco.bairro;
  
          customerRequest.address = addressRequest;
  
          httpContaAzul.post<CustomerRequest>(`https://api.contaazul.com/v1/customers`, 
          customerRequest, { headers })
          .toPromise()
          .then(() => resolve('Sucesso'))
          .catch(() => reject('Erro na sincronização'));
        
        } else {
          reject('Já existe um cliente cadastrado com o mesmo CPF!');
        }
  
      })

    });

    return promise;
  }

  pesquisarPagamentosPendentes(): Promise<SaleResponse[]> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('tokenContaAzul'));

    let dataFim : Date = new Date();
    let dataInicio : Date = new Date();
    dataInicio.setDate(dataInicio.getDate() - 45);


    let params = new HttpParams();
    params = params.append('emission_start', this.getDateParam(dataInicio));
    params = params.append('emission_end', this.getDateParam(dataFim));
    params = params.append('status', 'COMMITED');
    params = params.append('size', '2000');

    return this.http.get<SaleResponse[]>(`https://api.contaazul.com/v1/sales`, { headers, params }).toPromise();

  }

  private getDateParam(data: Date): string {
    let param: string = '';

    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();

    if (dia < 10) {
      param = param + '0';
    }

    param = param + dia + '/';

    if (mes < 10) {
      param = param + '0';
    }

    param = param + mes + '/' + ano;

    return param;
  } 
}

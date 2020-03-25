import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/core/model';
import { BuscaCEPService } from 'src/app/core/buscacep.service';
import { ContaAzulService } from 'src/app/core/contaazul.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  formulario: FormGroup;

  isModoEdicao = false;

  situacoes = [
    {label: 'Ativo', value: 'ATIVO'},
    {label: 'Inativo', value: 'INATIVO'}
  ];

  estados = [
    {label: 'Acre', value: 'AC'},
    {label: 'Alagoas', value: 'AL'},
    {label: 'Amapá', value: 'AP'},
    {label: 'Amazonas', value: 'AM'},
    {label: 'Bahia', value: 'BA'},
    {label: 'Ceará', value: 'CE'},
    {label: 'Distrito Federal', value: 'DF'},
    {label: 'Espírito Santo', value: 'ES'},
    {label: 'Goiás', value: 'GO'},
    {label: 'Maranhão', value: 'MA'},
    {label: 'Mato Grosso', value: 'MT'},
    {label: 'Mato Grosso do Sul', value: 'MS'},
    {label: 'Minas Gerais', value: 'MG'},
    {label: 'Pará', value: 'PA'},
    {label: 'Paraíba', value: 'PB'},
    {label: 'Paraná', value: 'PR'},
    {label: 'Pernambuco', value: 'PE'},
    {label: 'Piauí', value: 'PI'},
    {label: 'Rio de Janeiro', value: 'RJ'},
    {label: 'Rio Grande do Norte', value: 'RN'},
    {label: 'Rio Grande do Sul', value: 'RS'},
    {label: 'Rondônia', value: 'RO'},
    {label: 'Roraima', value: 'RR'},
    {label: 'Santa Catarina', value: 'SC'},
    {label: 'São Paulo', value: 'SP'},
    {label: 'Sergipe', value: 'SE'},
    {label: 'Tocantins', value: 'TO'}
  ];

  constructor(
    private clienteService: ClienteService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder,
    private buscaCEPService: BuscaCEPService,
    private contaAzulService: ContaAzulService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const codigoCliente = this.route.snapshot.params['codigo'];

    if (codigoCliente) {
      this.carregarCliente(codigoCliente);
    } else {
      this.isModoEdicao = true;
    }

    this.atualizarDisabledFormulario();
  }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      codigo: [null],
      nome: [null, [Validators.required, Validators.maxLength(60)]],
      cpf: [null, Validators.required],
      rg: [null, Validators.required],
      orgaoExpedidor: [null, [Validators.required, Validators.maxLength(10)]],
      dataNascimento: [null, [Validators.required, Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.maxLength(50), Validators.email]],
      outrosEmails: [null, Validators.maxLength(300)],
      numeroSocio: [null, Validators.maxLength(10)],
      telefonePrincipal: [null, [Validators.required, Validators.maxLength(15)]],
      outrosTelefones: [null, Validators.maxLength(100)],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.maxLength(9)]],
        logradouro: [null, [Validators.required, Validators.maxLength(50)]],
        numero: [null, [Validators.required, Validators.maxLength(15)]],
        complemento: [null, Validators.maxLength(30)],
        bairro: [null, [Validators.required, Validators.maxLength(50)]],
        cidade: [null, [Validators.required, Validators.maxLength(30)]],
        estado: ['PE', Validators.required]
      }),
      situacao: ['ATIVO', Validators.required],
      dataCadastro: []
    });
  }

  get isNovoCadastro() {
    return Boolean(!this.formulario.get('codigo').value);
  }

  carregarCliente(codigo: number) {
    this.clienteService.buscarPorCodigo(codigo)
      .then(cliente => {
        cliente.cpf = cliente.cpf.toString().padStart(11, '0');
        this.formulario.patchValue(cliente);
        this.atualizarTituloAlteracao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {

    const cliente: Cliente = new Cliente(this.formulario.value);

    if (this.isNovoCadastro) {
      this.adicionarCliente(cliente);
    } else {
      this.atualizarCliente(cliente);
    }
  }

  sincronizar() {

    const cliente: Cliente = new Cliente(this.formulario.value);

    this.contaAzulService.sincronizarCliente(cliente)
    .then(sucesso => {
      this.messageService.add({ severity : 'success', detail : 'Sincronização realizada com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarCliente(cliente: Cliente) {

    this.clienteService.adicionar(cliente)
    .then(clienteAdicionado => {
      this.messageService.add({ severity : 'success', detail : 'Cliente cadastrado com sucesso!'});
      this.router.navigate(['/clientes', clienteAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(cliente: Cliente) {
    this.clienteService.atualizar(cliente)
    .then(clienteAtualizado => {
      clienteAtualizado.cpf = clienteAtualizado.cpf.toString().padStart(11, '0');
      this.formulario.patchValue(clienteAtualizado);
      this.alternarModoEdicao();
      this.messageService.add({ severity : 'success', detail : 'Cliente alterado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    this.router.navigate(['/clientes/novo']);
  }

  atualizarTituloAlteracao() {
    this.title.setTitle(this.getTitulo());
  }

  getTitulo() {

    let titulo = '';

    if (this.isNovoCadastro) {
      titulo = 'Novo Cliente';
    } else {
      if (this.isModoEdicao) {
        titulo = 'Alteração de Cliente';
      } else {
        titulo = 'Dados do Cliente';
      }
    }

    return titulo;
  }

  alternarModoEdicao() {
    this.isModoEdicao = !this.isModoEdicao;
    this.atualizarDisabledFormulario();

    if (this.isModoEdicao === false) {
      this.carregarCliente(this.formulario.get('codigo').value);
    }

    this.atualizarTituloAlteracao();
  }

  private atualizarDisabledFormulario() {
    const state = this.isModoEdicao ? 'enable' : 'disable';

    Object.keys(this.formulario.controls).forEach((controlName) => {
      this.formulario.controls[controlName][state]();
    });
  }

  buscarCEP() {

    const cliente: Cliente = new Cliente(this.formulario.value);

    if (cliente != null && cliente.endereco != null && cliente.endereco.cep != null) {
      this.buscaCEPService.pesquisar(cliente.endereco.cep)
      .then(cepRetornado => {
        this.formulario.get('endereco').patchValue(
          {
            'logradouro' : cepRetornado.logradouro,
            'bairro' : cepRetornado.bairro,
            'cidade' : cepRetornado.cidade,
            'estado' : cepRetornado.estado
          }
          );
        this.messageService.add({ severity : 'success', detail : 'CEP encontrado!'});
      })
      .catch(erro => {
        if (erro.status === 404) {
          this.messageService.add({ severity : 'error', detail : 'CEP não existe!'})
        } else {
          this.messageService.add({ severity : 'error', detail : 'Erro na consulta do CEP!'})
        }
      });
    } else {
      this.messageService.add({ severity : 'error', detail : 'Informe um CEP!'});
    }
  }

}

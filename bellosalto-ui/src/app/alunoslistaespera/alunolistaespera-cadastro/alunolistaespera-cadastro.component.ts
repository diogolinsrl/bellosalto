import { AuthService } from 'src/app/seguranca/auth.service';
import { ClienteService } from './../../clientes/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlunoListaEsperaService } from '../alunolistaespera.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlunoListaEspera } from 'src/app/core/model';
import { TurmaService } from 'src/app/turmas/turma.service';

@Component({
  selector: 'app-alunolistaespera-cadastro',
  templateUrl: './alunolistaespera-cadastro.component.html',
  styleUrls: ['./alunolistaespera-cadastro.component.css']
})
export class AlunoListaEsperaCadastroComponent implements OnInit {

  formulario: FormGroup;

  situacoes = [
    {label: 'Ativo', value: 'ATIVO'},
    {label: 'Inativo', value: 'INATIVO'}
  ];

  clientes = [];
  turmas = [];

  isModoEdicao = false;

  constructor(
    private alunoListaEsperaService: AlunoListaEsperaService,
    private clienteService: ClienteService,
    private turmaService: TurmaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const codigoAluno = this.route.snapshot.params['codigo'];

    if (codigoAluno) {
      this.carregarAluno(codigoAluno);
    } else {
      this.isModoEdicao = true;
      this.carregarClientes();
    }

    this.carregarTurmas();

    this.atualizarDisabledFormulario();
  }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      codigo: [null],
      nome: [null, [Validators.required, Validators.maxLength(60)]],
      situacao: ['ATIVO', Validators.required],
      cliente: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      turma: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      dataNascimento: [null, [Validators.required, Validators.maxLength(10)]],
      escola: [null, [Validators.maxLength(50)]],
      bairro: [null, [Validators.maxLength(50)]],
      observacoesCuidados: [null, [Validators.maxLength(200)]],
      autorizaImagensIndividuais: [false],
      dataMatricula: []
    });
  }

  get isNovoCadastro() {
    return Boolean(!this.formulario.get('codigo').value);
  }

  carregarAluno(codigo: number) {
    this.alunoListaEsperaService.buscarPorCodigo(codigo)
    .then(aluno => {
        this.formulario.patchValue(aluno);
        this.carregarClientes();
        this.atualizarTituloAlteracao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarClientes() {

    let clientesAux = [];
    this.clienteService.listarTodos()
      .then(clientes => {
        clientesAux = clientes
          .map(c => ({ label: c.nome, value: c.codigo }));

        for (let i = 0; i < clientesAux.length; i++) {

          if (clientesAux[i].value !== this.formulario.get('cliente.codigo').value) {
            this.clientes.push(clientesAux[i]);
          }
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTurmas() {
    this.turmaService.listarTodas()
      .then(turmas => {
        this.turmas = turmas
          .map(t => ({ label: t.nome, value: t.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {

    const alunoListaEspera: AlunoListaEspera = new AlunoListaEspera(this.formulario.value);

    if (this.isNovoCadastro) {
      this.adicionarAluno(alunoListaEspera);
    } else {
      this.atualizarAluno(alunoListaEspera);
    }
  }

  adicionarAluno(alunoListaEspera: AlunoListaEspera) {

    this.alunoListaEsperaService.adicionar(alunoListaEspera)
    .then(alunoListaEsperaAdicionado => {
      this.messageService.add({ severity : 'success', detail : 'Aluno cadastrado com sucesso!'});
      this.router.navigate(['/alunosListaEspera', alunoListaEsperaAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAluno(alunoListaEspera: AlunoListaEspera) {
    this.alunoListaEsperaService.atualizar(alunoListaEspera)
    .then(alunoAtualizado => {
      this.formulario.patchValue(alunoAtualizado);
      this.alternarModoEdicao();
      this.messageService.add({ severity : 'success', detail : 'Aluno alterado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    this.router.navigate(['/alunosListaEspera/novo']);
  }

  atualizarTituloAlteracao() {
    this.title.setTitle(this.getTitulo());
  }

  getTitulo() {

    let titulo = '';

    if (this.isNovoCadastro) {
      titulo = 'Novo Aluno da Lista de Espera';
    } else {
      if (this.isModoEdicao) {
        titulo = 'Alteração de Aluno da Lista de Espera';
      } else {
        titulo = 'Dados do Aluno da Lista de Espera';
      }
    }

    return titulo;
  }

  alternarModoEdicao() {
    this.isModoEdicao = !this.isModoEdicao;
    this.atualizarDisabledFormulario();

    if (this.isModoEdicao === false) {
      this.carregarAluno(this.formulario.get('codigo').value);
    }

    this.atualizarTituloAlteracao();
  }

  private atualizarDisabledFormulario() {
    const state = this.isModoEdicao ? 'enable' : 'disable';

    Object.keys(this.formulario.controls).forEach((controlName) => {
      this.formulario.controls[controlName][state]();
    });
  }

}

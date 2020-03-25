import { AuthService } from 'src/app/seguranca/auth.service';
import { ClienteService } from './../../clientes/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlunoService } from '../aluno.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Aluno } from 'src/app/core/model';
import { TurmaService } from 'src/app/turmas/turma.service';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  formulario: FormGroup;

  situacoes = [
    {label: 'Ativo', value: 'ATIVO'},
    {label: 'Inativo', value: 'INATIVO'}
  ];

  clientes = [];
  turmas = [];

  isModoEdicao = false;

  constructor(
    private alunoService: AlunoService,
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
    this.alunoService.buscarPorCodigo(codigo)
    .then(aluno => {
        this.clientes.unshift({ label: aluno.cliente.nome, value: aluno.cliente.codigo });
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

    const aluno: Aluno = new Aluno(this.formulario.value);

    if (this.isNovoCadastro) {
      this.adicionarAluno(aluno);
    } else {
      this.atualizarAluno(aluno);
    }
  }

  adicionarAluno(aluno: Aluno) {

    this.alunoService.adicionar(aluno)
    .then(alunoAdicionado => {
      this.messageService.add({ severity : 'success', detail : 'Aluno cadastrado com sucesso!'});
      this.router.navigate(['/alunos', alunoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAluno(aluno: Aluno) {
    this.alunoService.atualizar(aluno)
    .then(alunoAtualizado => {
      this.formulario.patchValue(alunoAtualizado);
      this.alternarModoEdicao();
      this.messageService.add({ severity : 'success', detail : 'Aluno alterado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    this.router.navigate(['/alunos/novo']);
  }

  atualizarTituloAlteracao() {
    this.title.setTitle(this.getTitulo());
  }

  getTitulo() {

    let titulo = '';

    if (this.isNovoCadastro) {
      titulo = 'Novo Aluno';
    } else {
      if (this.isModoEdicao) {
        titulo = 'Alteração de Aluno';
      } else {
        titulo = 'Dados do Aluno';
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

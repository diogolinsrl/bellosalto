export class Endereco {

  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export class Cliente {

    codigo: number;
    nome: string;
    email: string;
    outrosEmails: string;
    cpf: string;
    rg: number;
    orgaoExpedidor: string;
    dataNascimento: Date;
    numeroSocio: string;
    endereco = new Endereco();
    telefonePrincipal: string;
    outrosTelefones: string;
    dataCadastro: Date;
    situacao: string;

    public constructor(init?: Partial<Cliente>) {
      this.endereco.estado = 'PE';
      this.situacao = 'ATIVO';
      Object.assign(this, init);
    }
}

export class Turma {

  codigo: number;
  nome: string;
  diasSemana: String;
  turno: string;
  horaInicio: string;
  horaFim: string;
  nivel: string;
  professor: string;
  idadeMinima: number;
  matriculaIntegral: number;
  mensalidadeIntegral: number;
  mensalidadeComDesconto: number;
  matriculaIntegralSocio: number;
  mensalidadeIntegralSocio: number;
  mensalidadeComDescontoSocio: number;

  public constructor(init?: Partial<Turma>) {
    Object.assign(this, init);
  }
}

export class TurmaConsultadaDTO {

  turma: Turma;
  qtAlunosMatriculados: number;

}

export class Aluno {

  codigo: number;
  nome: string;
  situacao: string;
  dataNascimento: Date;
  escola: string;
  bairro: string;
  observacoesCuidados: string;
  autorizaImagensIndividuais: number;
  cliente: Cliente;
  turma: Turma;
  dataMatricula: Date;

  public constructor(init?: Partial<Aluno>) {
    Object.assign(this, init);
  }

}

export class AlunoListaEspera {

  codigo: number;
  prioridade: string;
  nome: string;
  dataNascimento: Date;
  dataEntrada: Date;
  dataSaida: Date;
  dataAPartirDe: Date;
  responsavel: string;
  telefoneCelular: string;
  email: string;
  observacoes: string;
  situacao: string;
  nivel: string;
  turnos: string;
  dias: string;
  desimpedido: number;
  mesesEspera: number;
  posicao: number;
  idade: number;

  public constructor(init?: Partial<AlunoListaEspera>) {
    Object.assign(this, init);
  }

}

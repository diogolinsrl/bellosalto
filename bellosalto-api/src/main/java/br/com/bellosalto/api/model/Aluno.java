package br.com.bellosalto.api.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "aluno")
public class Aluno extends AbstractEntidade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull
	@Size(min = 3, max = 60)
	private String nome;

	@NotNull
	@Enumerated(EnumType.STRING)
	private SituacaoAluno situacao;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@NotNull
	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;

	@Size(max = 50)
	private String escola;

	@Size(max = 50)
	private String bairro;

	@Size(max = 200)
	private String observacoesCuidados;

	@NotNull
	private Boolean autorizaImagensIndividuais;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "codigo_cliente")
	private Cliente cliente;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "codigo_turma")
	private Turma turma;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_matricula")
	private LocalDate dataMatricula;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_inativacao")
	private LocalDate dataInativacao;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Aluno other = (Aluno) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getEscola() {
		return escola;
	}

	public void setEscola(String escola) {
		this.escola = escola;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getObservacoesCuidados() {
		return observacoesCuidados;
	}

	public void setObservacoesCuidados(String observacoesCuidados) {
		this.observacoesCuidados = observacoesCuidados;
	}

	public Boolean getAutorizaImagensIndividuais() {
		return autorizaImagensIndividuais;
	}

	public void setAutorizaImagensIndividuais(Boolean autorizaImagensIndividuais) {
		this.autorizaImagensIndividuais = autorizaImagensIndividuais;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}

	public LocalDate getDataMatricula() {
		return dataMatricula;
	}

	public void setDataMatricula(LocalDate dataMatricula) {
		this.dataMatricula = dataMatricula;
	}

	public LocalDate getDataInativacao() {
		return dataInativacao;
	}

	public void setDataInativacao(LocalDate dataInativacao) {
		this.dataInativacao = dataInativacao;
	}
	
	public SituacaoAluno getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoAluno situacao) {
		this.situacao = situacao;
	}
}

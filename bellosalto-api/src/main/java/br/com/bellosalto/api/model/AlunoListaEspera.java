package br.com.bellosalto.api.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "aluno")
public class AlunoListaEspera extends AbstractEntidade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull
	@Size(max = 30)
	private PrioridadeListaEspera prioridade;

	@NotNull
	@Size(min = 3, max = 50)
	private String nome;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@NotNull
	@Column(name = "data_entrada")
	private LocalDate dataEntrada;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_saida")
	private LocalDate dataSaida;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_a_partir_de")
	private LocalDate dataAPartirDe;

	@Size(min = 3, max = 50)
	private String responsavel;

	@Size(max = 20)
	@Column(name = "telefone")
	private String telefoneCelular;

	@Size(max = 50)
	private String email;

	@Size(max = 300)
	private String observacoes;

	@NotNull
	@Enumerated(EnumType.STRING)
	private SituacaoAlunoListaEspera situacao;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Nivel nivel;

	@Size(max = 35)
	private String turnos;

	@Size(max = 35)
	private String dias;

	@JsonInclude()
	@Transient
	private Boolean desimpedido;

	@JsonInclude()
	@Transient
	private Integer mesesEspera;

	@JsonInclude()
	@Transient
	private Integer posicao;

	@JsonInclude()
	@Transient
	private Integer idade;

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
		AlunoListaEspera other = (AlunoListaEspera) obj;
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

	public PrioridadeListaEspera getPrioridade() {
		return prioridade;
	}

	public void setPrioridade(PrioridadeListaEspera prioridade) {
		this.prioridade = prioridade;
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

	public LocalDate getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(LocalDate dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public LocalDate getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(LocalDate dataSaida) {
		this.dataSaida = dataSaida;
	}

	public LocalDate getDataAPartirDe() {
		return dataAPartirDe;
	}

	public void setDataAPartirDe(LocalDate dataAPartirDe) {
		this.dataAPartirDe = dataAPartirDe;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public String getTelefoneCelular() {
		return telefoneCelular;
	}

	public void setTelefoneCelular(String telefoneCelular) {
		this.telefoneCelular = telefoneCelular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public SituacaoAlunoListaEspera getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoAlunoListaEspera situacao) {
		this.situacao = situacao;
	}

	public Nivel getNivel() {
		return nivel;
	}

	public void setNivel(Nivel nivel) {
		this.nivel = nivel;
	}

	public String getTurnos() {
		return turnos;
	}

	public void setTurnos(String turnos) {
		this.turnos = turnos;
	}

	public String getDias() {
		return dias;
	}

	public void setDias(String dias) {
		this.dias = dias;
	}

	public Boolean getDesimpedido() {
		return desimpedido;
	}

	public void setDesimpedido(Boolean desimpedido) {
		this.desimpedido = desimpedido;
	}

	public Integer getPosicao() {
		return posicao;
	}

	public void setPosicao(Integer posicao) {
		this.posicao = posicao;
	}

	public Integer getMesesEspera() {
		return mesesEspera;
	}

	public void setMesesEspera(Integer mesesEspera) {
		this.mesesEspera = mesesEspera;
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

}

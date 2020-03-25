package br.com.bellosalto.api.repository.filter;

import br.com.bellosalto.api.model.SituacaoAluno;

public class AlunoFilter {

	private String nome;

	private Long codigoCliente;

	private Long codigoTurma;

	private SituacaoAluno situacao;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getCodigoCliente() {
		return codigoCliente;
	}

	public void setCodigoCliente(Long codigoCliente) {
		this.codigoCliente = codigoCliente;
	}

	public Long getCodigoTurma() {
		return codigoTurma;
	}

	public void setCodigoTurma(Long codigoTurma) {
		this.codigoTurma = codigoTurma;
	}

	public SituacaoAluno getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoAluno situacao) {
		this.situacao = situacao;
	}
}

package br.com.bellosalto.api.repository.filter;

import br.com.bellosalto.api.model.SituacaoAlunoListaEspera;

public class AlunoListaEsperaFilter {

	private String nomeAluno;

	private String nomeResponsavel;

	private Long codigoTurma;

	private SituacaoAlunoListaEspera situacao;

	public String getNomeAluno() {
		return nomeAluno;
	}

	public void setNomeAluno(String nomeAluno) {
		this.nomeAluno = nomeAluno;
	}

	public String getNomeResponsavel() {
		return nomeResponsavel;
	}

	public void setNomeResponsavel(String nomeResponsavel) {
		this.nomeResponsavel = nomeResponsavel;
	}

	public Long getCodigoTurma() {
		return codigoTurma;
	}

	public void setCodigoTurma(Long codigoTurma) {
		this.codigoTurma = codigoTurma;
	}

	public SituacaoAlunoListaEspera getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoAlunoListaEspera situacao) {
		this.situacao = situacao;
	}

}

package br.com.bellosalto.api.repository.filter;

import br.com.bellosalto.api.model.SituacaoCliente;

public class ClienteFilter {

	private String nome;

	private SituacaoCliente situacao;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public SituacaoCliente getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoCliente situacao) {
		this.situacao = situacao;
	}
}

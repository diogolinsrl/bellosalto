package br.com.bellosalto.api.repository.aluno;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.repository.filter.AlunoFilter;

public interface AlunoRepositoryQuery {

	public Page<Aluno> filtrar(AlunoFilter alunoFilter, Pageable pageable);
}

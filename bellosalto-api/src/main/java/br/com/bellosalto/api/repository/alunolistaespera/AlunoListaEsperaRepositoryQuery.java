package br.com.bellosalto.api.repository.alunolistaespera;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.bellosalto.api.model.AlunoListaEspera;
import br.com.bellosalto.api.repository.filter.AlunoListaEsperaFilter;

public interface AlunoListaEsperaRepositoryQuery {

	public Page<AlunoListaEspera> filtrar(AlunoListaEsperaFilter alunoListaEsperaFilter, Pageable pageable);
}

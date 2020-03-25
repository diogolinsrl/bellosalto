package br.com.bellosalto.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bellosalto.api.model.AlunoListaEspera;
import br.com.bellosalto.api.repository.alunolistaespera.AlunoListaEsperaRepositoryQuery;

public interface AlunoListaEsperaRepository
		extends JpaRepository<AlunoListaEspera, Long>, AlunoListaEsperaRepositoryQuery {

}

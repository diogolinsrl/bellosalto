package br.com.bellosalto.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bellosalto.api.model.Turma;
import br.com.bellosalto.api.repository.dto.TurmaConsultadaDTO;
import br.com.bellosalto.api.repository.filter.TurmaFilter;

public interface TurmaRepository extends JpaRepository<Turma, Long> {

	public Page<Turma> findByNomeContainingOrderByNomeAsc(String nome, Pageable pageable);
	
	public List<TurmaConsultadaDTO> filtrar(TurmaFilter turmaFilter);
}

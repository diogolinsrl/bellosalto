package br.com.bellosalto.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.repository.aluno.AlunoRepositoryQuery;

public interface AlunoRepository extends JpaRepository<Aluno, Long>, AlunoRepositoryQuery {

	
}

package br.com.bellosalto.api.repository.turma;

import java.util.List;

import br.com.bellosalto.api.repository.dto.TurmaConsultadaDTO;
import br.com.bellosalto.api.repository.filter.TurmaFilter;

public interface TurmaRepositoryQuery {

	public List<TurmaConsultadaDTO> filtrar(TurmaFilter turmaFilter);
}

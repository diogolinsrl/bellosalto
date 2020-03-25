package br.com.bellosalto.api.repository.turma;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import br.com.bellosalto.api.model.Turma;
import br.com.bellosalto.api.repository.dto.TurmaConsultadaDTO;
import br.com.bellosalto.api.repository.filter.TurmaFilter;

public class TurmaRepositoryImpl implements TurmaRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<TurmaConsultadaDTO> filtrar(TurmaFilter turmaFilter) {

		ArrayList<TurmaConsultadaDTO> retorno = new ArrayList<>();

		String queryStr = "select turma, count(aluno) as qtAlunosMatriculados from br.com.bellosalto.api.model.Turma turma, br.com.bellosalto.api.model.Aluno aluno ";
		queryStr = queryStr + " where aluno.turma = turma and aluno.situacao = 'ATIVO' ";

		if (turmaFilter != null && turmaFilter.getNome() != null && turmaFilter.getNome().trim().length() > 0) {
			turmaFilter.setNome(turmaFilter.getNome().trim());

			queryStr = queryStr + " and UPPER(turma.nome) LIKE '%" + turmaFilter.getNome().toUpperCase() + "%' ";
		}

		queryStr = queryStr + "group by turma order by turma.nome";

		Query query = manager.createQuery(queryStr);

		for (Object obj : query.getResultList()) {
			Object[] arrayObj = (Object[]) obj;

			TurmaConsultadaDTO turmaConsultadaDTO = new TurmaConsultadaDTO((Turma) arrayObj[0], (Long) arrayObj[1]);
			retorno.add(turmaConsultadaDTO);
		}

		return retorno;
	}

}

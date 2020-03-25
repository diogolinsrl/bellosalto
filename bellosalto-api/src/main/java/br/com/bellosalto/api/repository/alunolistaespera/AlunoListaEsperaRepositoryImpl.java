package br.com.bellosalto.api.repository.alunolistaespera;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import br.com.bellosalto.api.model.AlunoListaEspera;
import br.com.bellosalto.api.model.Nivel;
import br.com.bellosalto.api.model.PrioridadeListaEspera;
import br.com.bellosalto.api.model.SituacaoAlunoListaEspera;
import br.com.bellosalto.api.repository.filter.AlunoListaEsperaFilter;

public class AlunoListaEsperaRepositoryImpl implements AlunoListaEsperaRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<AlunoListaEspera> filtrar(AlunoListaEsperaFilter alunoListaEsperaFilter, Pageable pageable) {

		StringBuilder sb = new StringBuilder();

		sb.append(
				"SELECT a.codigo, a.prioridade, a.nome, a.data_nascimento, a.data_entrada, a.data_saida, a.data_a_partir_de, ");
		sb.append("a.responsavel, a.telefone, a.email, a.observacoes, a.situacao, a.nivel, a.turnos, a.dias, ");
		sb.append("TIMESTAMPDIFF(MONTH, a.data_entrada, IFNULL(a.data_saida, CURDATE())) AS meses_espera, ");
		sb.append("(a.situacao = 'AGUARDANDO' AND (a.data_a_partir_de is null OR CURDATE() >= a.data_a_partir_de)) AS desimpedido, ");
		sb.append("TIMESTAMPDIFF(YEAR, a.data_nascimento, CURDATE()) AS idade ");
		sb.append("FROM aluno_lista_espera a, prioridade_lista_espera p ");

		if (alunoListaEsperaFilter.getCodigoTurma() != null && alunoListaEsperaFilter.getCodigoTurma() > 0) {
			sb.append(", turma t WHERE a.prioridade = p.prioridade ");
			sb.append("AND t.codigo = ?1 ");
			sb.append("AND a.turnos LIKE CONCAT('%',t.turno,'%') ");
			sb.append("AND a.dias LIKE CONCAT('%',t.dias_semana,'%') ");
			sb.append("AND ");
			sb.append("( ");
			sb.append("(a.data_nascimento IS NOT NULL AND a.nivel = 'BABY' AND t.nivel = 'BABY' ");
			sb.append("AND a.data_nascimento > DATE_SUB(CURDATE(), INTERVAL 7 YEAR) ");
			sb.append("AND a.data_nascimento <= DATE_SUB(CURDATE(), INTERVAL 4 YEAR) ");
			sb.append(") ");
			sb.append("OR ");
			sb.append("(a.data_nascimento IS NOT NULL AND a.nivel = 'BABY' AND t.nivel = 'NIVEL_1' ");
			sb.append("AND a.data_nascimento <= DATE_SUB(CURDATE(), INTERVAL 7 YEAR) ");
			sb.append(") ");
			sb.append("OR ");
			sb.append("(a.nivel = t.nivel) ");
			sb.append(") ");
		} else {
			sb.append("WHERE a.prioridade = p.prioridade ");
		}

		sb.append("ORDER BY p.valor, a.data_entrada, a.codigo ");

		Query query = manager.createNativeQuery(sb.toString());

		if (alunoListaEsperaFilter.getCodigoTurma() != null && alunoListaEsperaFilter.getCodigoTurma() > 0) {
			query.setParameter(1, alunoListaEsperaFilter.getCodigoTurma());
		}

		List<Object[]> retornoBanco = query.getResultList();
		ArrayList<AlunoListaEspera> retornoBancoConvertido = new ArrayList<>();
		ArrayList<AlunoListaEspera> retornoFiltrado = new ArrayList<>();
		ArrayList<AlunoListaEspera> retornoFiltradoPaginado = new ArrayList<>();

		int posicao = 0;

		for (Object[] obj : retornoBanco) {

			AlunoListaEspera alunoListaEspera = new AlunoListaEspera();
			alunoListaEspera.setCodigo(Long.valueOf(obj[0].toString()));
			alunoListaEspera.setPrioridade(PrioridadeListaEspera.valueOf(obj[1].toString()));
			alunoListaEspera.setNome((String) obj[2]);
			alunoListaEspera.setDataNascimento(obj[3] != null ? ((java.sql.Date) obj[3]).toLocalDate() : null);
			alunoListaEspera.setDataEntrada(obj[4] != null ? ((java.sql.Date) obj[4]).toLocalDate() : null);
			alunoListaEspera.setDataSaida(obj[5] != null ? ((java.sql.Date) obj[5]).toLocalDate() : null);
			alunoListaEspera.setDataAPartirDe(obj[6] != null ? ((java.sql.Date) obj[6]).toLocalDate() : null);
			alunoListaEspera.setResponsavel((String) obj[7]);
			alunoListaEspera.setTelefoneCelular((String) obj[8]);
			alunoListaEspera.setEmail((String) obj[9]);
			alunoListaEspera.setObservacoes((String) obj[10]);
			alunoListaEspera.setSituacao(SituacaoAlunoListaEspera.valueOf((String) obj[11]));
			alunoListaEspera.setNivel(Nivel.valueOf((String) obj[12]));
			alunoListaEspera.setTurnos((String) obj[13]);
			alunoListaEspera.setDias((String) obj[14]);
			alunoListaEspera.setMesesEspera(Integer.valueOf(obj[15].toString()));
			alunoListaEspera.setDesimpedido(obj[16].toString().equals("1") ? Boolean.TRUE : Boolean.FALSE);
			alunoListaEspera.setIdade(obj[17] != null ? Integer.valueOf(obj[17].toString()) : null);

			if (alunoListaEspera.getDesimpedido()) {
				posicao++;
				alunoListaEspera.setPosicao(posicao);
			} else {
				alunoListaEspera.setPosicao(0);
			}

			retornoBancoConvertido.add(alunoListaEspera);
		}

		for (AlunoListaEspera alunoListaEspera : retornoBancoConvertido) {

			if (alunoListaEsperaFilter.getNomeAluno() != null && alunoListaEsperaFilter.getNomeAluno().length() > 0) {
				if (alunoListaEspera.getNome() == null || !alunoListaEspera.getNome().toLowerCase()
						.contains(alunoListaEsperaFilter.getNomeAluno().toLowerCase())) {

					continue;
				}
			}

			if (alunoListaEsperaFilter.getNomeResponsavel() != null
					&& alunoListaEsperaFilter.getNomeResponsavel().length() > 0) {
				if (alunoListaEspera.getResponsavel() == null || !alunoListaEspera.getResponsavel().toLowerCase()
						.contains(alunoListaEsperaFilter.getNomeResponsavel().toLowerCase())) {

					continue;
				}
			}

			if (alunoListaEsperaFilter.getSituacao() != null) {
				if (alunoListaEspera.getSituacao() == null
						|| !alunoListaEspera.getSituacao().equals(alunoListaEsperaFilter.getSituacao())) {

					continue;
				}
			}

			retornoFiltrado.add(alunoListaEspera);
		}

		int paginaAtual = pageable.getPageNumber(); // inicia com 0
		int totalRegistrosPorPagina = pageable.getPageSize();
		int totalRegistros = retornoFiltrado.size();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;
		int ultimoRegistroDaPagina = primeiroRegistroDaPagina + totalRegistrosPorPagina - 1;

		if (primeiroRegistroDaPagina < totalRegistros) {

			if (ultimoRegistroDaPagina >= totalRegistros) {
				ultimoRegistroDaPagina = totalRegistros - 1;
			}

			for (int i = primeiroRegistroDaPagina; i <= ultimoRegistroDaPagina; i++) {
				retornoFiltradoPaginado.add(retornoFiltrado.get(i));
			}

		}

		return new PageImpl<>(retornoFiltradoPaginado, pageable, totalRegistros);
	}

}

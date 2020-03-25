package br.com.bellosalto.api.repository.aluno;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.repository.filter.AlunoFilter;

public class AlunoRepositoryImpl implements AlunoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Aluno> filtrar(AlunoFilter alunoFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Aluno> criteria = builder.createQuery(Aluno.class);
		Root<Aluno> root = criteria.from(Aluno.class);

		Predicate[] predicates = criarRestricoes(alunoFilter, builder, root);
		criteria.where(predicates);
		criteria.orderBy(builder.asc(root.get("nome")));

		TypedQuery<Aluno> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);
		
		return new PageImpl<>(query.getResultList(), pageable, total(alunoFilter));
	}

	private Predicate[] criarRestricoes(AlunoFilter alunoFilter, CriteriaBuilder builder, Root<Aluno> root) {
		List<Predicate> predicates = new ArrayList<>();

		if (!StringUtils.isEmpty(alunoFilter.getNome())) {
			predicates.add(builder.like(builder.lower(root.get("nome")),
					"%" + alunoFilter.getNome().toLowerCase() + "%"));
		}

		if (alunoFilter.getCodigoCliente() != null) {
			predicates.add(builder.equal(root.get("cliente").get("codigo"),
					alunoFilter.getCodigoCliente()));
		}

		if (alunoFilter.getCodigoTurma() != null) {
			predicates.add(builder.equal(root.get("turma").get("codigo"),
					alunoFilter.getCodigoTurma()));
		}

		if (alunoFilter.getSituacao() != null) {
			predicates.add(builder.equal(root.get("situacao"), alunoFilter.getSituacao()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

	private void adicionarRestricoesDePaginacao(TypedQuery<Aluno> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}

	private Long total(AlunoFilter alunoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Aluno> root = criteria.from(Aluno.class);

		Predicate[] predicates = criarRestricoes(alunoFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

}

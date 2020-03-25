package br.com.bellosalto.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.bellosalto.api.model.Turma;
import br.com.bellosalto.api.repository.TurmaRepository;

@Service
public class TurmaService extends AbstractService {

	@Autowired
	private TurmaRepository turmaRepository;

	public Turma atualizar(Long codigo, Turma turma) {

		Turma turmaSalvo = buscarTurmaPeloCodigo(codigo);

		BeanUtils.copyProperties(turma, turmaSalvo, "codigo");

		return turmaRepository.save(turmaSalvo);
	}

	public Turma buscarTurmaPeloCodigo(Long codigo) {

		Optional<Turma> turmaSalva = turmaRepository.findById(codigo);

		if (!turmaSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}

		return turmaSalva.get();
	}

}

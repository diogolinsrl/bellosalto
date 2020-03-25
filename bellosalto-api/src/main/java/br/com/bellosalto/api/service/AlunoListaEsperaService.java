package br.com.bellosalto.api.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.bellosalto.api.model.AlunoListaEspera;
import br.com.bellosalto.api.repository.AlunoListaEsperaRepository;

@Service
public class AlunoListaEsperaService {

	@Autowired
	private AlunoListaEsperaRepository alunoRepository;

	public AlunoListaEspera salvar(AlunoListaEspera alunoListaEspera) {

		alunoListaEspera.setDataEntrada(LocalDate.now());

		return alunoRepository.save(alunoListaEspera);

	}

	public AlunoListaEspera atualizar(Long codigo, AlunoListaEspera alunoListaEspera) {

		AlunoListaEspera alunoListaEsperaSalvo = buscarAlunoListaEsperaExistente(codigo);

		BeanUtils.copyProperties(alunoListaEspera, alunoListaEsperaSalvo, "codigo");

		return alunoRepository.save(alunoListaEsperaSalvo);
	}

	private AlunoListaEspera buscarAlunoListaEsperaExistente(Long codigo) {

		Optional<AlunoListaEspera> alunoListaEsperaSalvo = alunoRepository.findById(codigo);

		if (!alunoListaEsperaSalvo.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}

		return alunoListaEsperaSalvo.get();
	}

}

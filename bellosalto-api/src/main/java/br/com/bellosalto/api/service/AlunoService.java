package br.com.bellosalto.api.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.model.Cliente;
import br.com.bellosalto.api.model.SituacaoAluno;
import br.com.bellosalto.api.model.SituacaoCliente;
import br.com.bellosalto.api.repository.AlunoRepository;
import br.com.bellosalto.api.repository.ClienteRepository;
import br.com.bellosalto.api.service.exception.ClienteInexistenteOuInativoException;

@Service
public class AlunoService {

	@Autowired
	private AlunoRepository alunoRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	public Aluno salvar(Aluno aluno) {

		validarCliente(aluno);
		
		if (SituacaoAluno.INATIVO.equals(aluno.getSituacao())) {
			aluno.setDataInativacao(LocalDate.now());
		}
		
		aluno.setDataMatricula(LocalDate.now());

		return alunoRepository.save(aluno);

	}

	public Aluno atualizar(Long codigo, Aluno aluno) {

		Aluno alunoSalvo = buscarAlunoExistente(codigo);

		if (!aluno.getCliente().equals(alunoSalvo.getCliente())) {
			validarCliente(aluno);
		}

		if (SituacaoAluno.INATIVO.equals(aluno.getSituacao())) {
			aluno.setDataInativacao(LocalDate.now());
		}
		
		BeanUtils.copyProperties(aluno, alunoSalvo, "codigo");

		return alunoRepository.save(alunoSalvo);
	}

	private void validarCliente(Aluno aluno) {

		Cliente cliente = null;

		if (aluno.getCliente().getCodigo() != null) {
			cliente = clienteRepository.getOne(aluno.getCliente().getCodigo());
		}

		if (cliente == null || SituacaoCliente.INATIVO.equals(cliente.getSituacao())) {
			throw new ClienteInexistenteOuInativoException();
		}
	}

	private Aluno buscarAlunoExistente(Long codigo) {

		Optional<Aluno> alunoSalvo = alunoRepository.findById(codigo);

		if (!alunoSalvo.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}

		return alunoSalvo.get();
	}

}

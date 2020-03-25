package br.com.bellosalto.api.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.model.Cliente;
import br.com.bellosalto.api.model.SituacaoAluno;
import br.com.bellosalto.api.model.SituacaoCliente;
import br.com.bellosalto.api.repository.AlunoRepository;
import br.com.bellosalto.api.repository.ClienteRepository;
import br.com.bellosalto.api.repository.filter.AlunoFilter;

@Service
public class ClienteService extends AbstractService {

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private AlunoRepository alunoRepository;

	public Cliente salvar(Cliente cliente) {

		this.validarCodigoPOST(cliente);

		cliente.setDataCadastro(LocalDate.now());

		return clienteRepository.save(cliente);

	}

	public Cliente atualizar(Long codigo, Cliente cliente) {

		Cliente clienteSalvo = buscarClientePeloCodigo(codigo);

		BeanUtils.copyProperties(cliente, clienteSalvo, "codigo");

		if (SituacaoCliente.INATIVO.equals(cliente.getSituacao())) {

			AlunoFilter alunoFilter = new AlunoFilter();
			alunoFilter.setCodigoCliente(cliente.getCodigo());
			alunoFilter.setSituacao(SituacaoAluno.ATIVO);

			List<Aluno> alunos = alunoRepository.filtrar(alunoFilter, PageRequest.of(0, 100)).getContent();

			for (Aluno aluno : alunos) {
				aluno.setSituacao(SituacaoAluno.INATIVO);
				aluno.setDataInativacao(LocalDate.now());
				alunoRepository.save(aluno);
			}

		}

		return clienteRepository.save(clienteSalvo);
	}

	public Cliente buscarClientePeloCodigo(Long codigo) {

		Optional<Cliente> clienteSalvo = clienteRepository.findById(codigo);

		if (!clienteSalvo.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}

		return clienteSalvo.get();
	}

}

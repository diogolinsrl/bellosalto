package br.com.bellosalto.api.resource;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.bellosalto.api.event.RecursoCriadoEvent;
import br.com.bellosalto.api.model.AlunoListaEspera;
import br.com.bellosalto.api.repository.AlunoListaEsperaRepository;
import br.com.bellosalto.api.repository.filter.AlunoListaEsperaFilter;
import br.com.bellosalto.api.service.AlunoListaEsperaService;

@RestController
@RequestMapping("/alunosListaEspera")
public class AlunoListaEsperaResource {

	@Autowired
	private AlunoListaEsperaRepository alunoListaEsperaRepository;

	@Autowired
	private AlunoListaEsperaService alunoListaEsperaService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private MessageSource messageSource;

	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_ALUNO_LISTA_ESPERA') and #oauth2.hasScope('read')")
	public Page<AlunoListaEspera> pesquisar(AlunoListaEsperaFilter alunoListaEsperaFilter, Pageable pageable) {
		return alunoListaEsperaRepository.filtrar(alunoListaEsperaFilter, pageable);
	}

	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_ALUNO_LISTA_ESPERA') and #oauth2.hasScope('read')")
	public ResponseEntity<AlunoListaEspera> buscarPeloCodigo(@PathVariable Long codigo) {
		Optional<AlunoListaEspera> alunoListaEspera = alunoListaEsperaRepository.findById(codigo);
		return alunoListaEspera.isPresent() ? ResponseEntity.ok(alunoListaEspera.get()) : ResponseEntity.notFound().build();
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ALUNO_LISTA_ESPERA') and #oauth2.hasScope('write')")
	public ResponseEntity<AlunoListaEspera> criar(@Valid @RequestBody AlunoListaEspera alunoListaEspera, HttpServletResponse response) {
		AlunoListaEspera alunoListaEsperaSalvo = alunoListaEsperaService.salvar(alunoListaEspera);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, alunoListaEsperaSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(alunoListaEsperaSalvo);
	}

	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_ALUNO_LISTA_ESPERA') and #oauth2.hasScope('write')")
	public void remover(@PathVariable Long codigo) {
		alunoListaEsperaRepository.deleteById(codigo);
	}

	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ALUNO_LISTA_ESPERA')")
	public ResponseEntity<AlunoListaEspera> atualizar(@PathVariable Long codigo, @Valid @RequestBody AlunoListaEspera alunoListaEspera) {
		try {
			AlunoListaEspera alunoListaEsperaSalvo = alunoListaEsperaService.atualizar(codigo, alunoListaEspera);
			return ResponseEntity.ok(alunoListaEsperaSalvo);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

}
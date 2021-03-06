package br.com.bellosalto.api.resource;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.bellosalto.api.event.RecursoCriadoEvent;
import br.com.bellosalto.api.exceptionhandler.BelloSaltoExceptionHandler.Erro;
import br.com.bellosalto.api.model.Aluno;
import br.com.bellosalto.api.repository.AlunoRepository;
import br.com.bellosalto.api.repository.filter.AlunoFilter;
import br.com.bellosalto.api.service.AlunoService;
import br.com.bellosalto.api.service.exception.ClienteInexistenteOuInativoException;

@RestController
@RequestMapping("/alunos")
public class AlunoResource {

	@Autowired
	private AlunoRepository alunoRepository;

	@Autowired
	private AlunoService alunoService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private MessageSource messageSource;

	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_ALUNO') and #oauth2.hasScope('read')")
	public Page<Aluno> pesquisar(AlunoFilter alunoFilter, Pageable pageable) {
		return alunoRepository.filtrar(alunoFilter, pageable);
	}

	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_ALUNO') and #oauth2.hasScope('read')")
	public ResponseEntity<Aluno> buscarPeloCodigo(@PathVariable Long codigo) {
		Optional<Aluno> aluno = alunoRepository.findById(codigo);
		return aluno.isPresent() ? ResponseEntity.ok(aluno.get()) : ResponseEntity.notFound().build();
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ALUNO') and #oauth2.hasScope('write')")
	public ResponseEntity<Aluno> criar(@Valid @RequestBody Aluno aluno, HttpServletResponse response) {
		Aluno alunoSalvo = alunoService.salvar(aluno);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, alunoSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(alunoSalvo);
	}

	@ExceptionHandler({ ClienteInexistenteOuInativoException.class })
	public ResponseEntity<Object> handleClienteInexistenteOuInativoException(ClienteInexistenteOuInativoException ex) {
		String mensagemUsuario = messageSource.getMessage("cliente.inexistente-ou-inativo", null,
				LocaleContextHolder.getLocale());
		String mensagemDesenvolvedor = ex.toString();
		List<Erro> erros = Arrays.asList(new Erro(mensagemUsuario, mensagemDesenvolvedor));
		return ResponseEntity.badRequest().body(erros);
	}

	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_ALUNO') and #oauth2.hasScope('write')")
	public void remover(@PathVariable Long codigo) {
		alunoRepository.deleteById(codigo);
	}

	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ALUNO')")
	public ResponseEntity<Aluno> atualizar(@PathVariable Long codigo, @Valid @RequestBody Aluno aluno) {
		try {
			Aluno alunoSalvo = alunoService.atualizar(codigo, aluno);
			return ResponseEntity.ok(alunoSalvo);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

}
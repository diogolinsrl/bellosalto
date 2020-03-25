package br.com.bellosalto.api.resource;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.bellosalto.api.event.RecursoCriadoEvent;
import br.com.bellosalto.api.model.Turma;
import br.com.bellosalto.api.repository.TurmaRepository;
import br.com.bellosalto.api.repository.dto.TurmaConsultadaDTO;
import br.com.bellosalto.api.repository.filter.TurmaFilter;
import br.com.bellosalto.api.service.TurmaService;

@RestController
@RequestMapping("/turmas")
public class TurmaResource extends AbstractResource {

	@Autowired
	private TurmaRepository turmaRepository;

	@Autowired
	private TurmaService turmaService;

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_TURMA') and #oauth2.hasScope('write')")
	public ResponseEntity<Turma> criar(@Valid @RequestBody Turma turma, HttpServletResponse response) {

		turmaService.validarCodigoPOST(turma);

		Turma turmaSalva = turmaRepository.save(turma);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, turmaSalva.getCodigo()));

		return ResponseEntity.status(HttpStatus.CREATED).body(turmaSalva);
	}

	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_TURMA') and #oauth2.hasScope('read')")
	public ResponseEntity<Turma> buscarPeloCodigo(@PathVariable Long codigo) {
		Optional<Turma> turma = turmaRepository.findById(codigo);
		return turma.isPresent() ? ResponseEntity.ok(turma.get()) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_TURMA') and #oauth2.hasScope('write')")
	public void remover(@PathVariable Long codigo) {
		turmaRepository.deleteById(codigo);
	}

	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_TURMA') and #oauth2.hasScope('write')")
	public ResponseEntity<Turma> atualizar(@PathVariable Long codigo, @Valid @RequestBody Turma turma) {
		Turma turmaSalva = turmaService.atualizar(codigo, turma);
		return ResponseEntity.ok(turmaSalva);
	}

	@GetMapping("/porNome")
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_TURMA') and #oauth2.hasScope('read')")
	public Page<Turma> pesquisarPorNome(@RequestParam(required = false, defaultValue = "%") String nome, Pageable pageable) {
		return turmaRepository.findByNomeContainingOrderByNomeAsc(nome, pageable);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_CONSULTAR_TURMA') and #oauth2.hasScope('read')")
	public List<TurmaConsultadaDTO> pesquisar(TurmaFilter turmaFilter) {
		return turmaRepository.filtrar(turmaFilter);
	}

}
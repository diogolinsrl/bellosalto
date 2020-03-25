package br.com.bellosalto.api.resource;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import br.com.bellosalto.api.exceptionhandler.BelloSaltoExceptionHandler.Erro;
import br.com.bellosalto.api.service.exception.CodigoPreenchidoPOSTException;

public class AbstractResource {

	@Autowired
	protected ApplicationEventPublisher publisher;

	@Autowired
	protected MessageSource messageSource;

	@ExceptionHandler({ CodigoPreenchidoPOSTException.class })
	public ResponseEntity<Object> handlePessoaInexistenteOuInativaException(CodigoPreenchidoPOSTException ex) {
		String mensagemUsuario = messageSource.getMessage("recurso.codigo-preenchido-post", null,
				LocaleContextHolder.getLocale());
		String mensagemDesenvolvedor = ex.toString();
		List<Erro> erros = Arrays.asList(new Erro(mensagemUsuario, mensagemDesenvolvedor));
		return ResponseEntity.badRequest().body(erros);
	}
}
